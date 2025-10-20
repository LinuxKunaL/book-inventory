import { useForm, Controller } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useRevalidator } from "react-router";
import Modal from "@components/interfaces/Modal";
import { Button, Checkbox, ScrollArea } from "@radix-ui/themes";
import useStudentApi from "@hooks/api/admin/useStudent.api";
import InputControlled from "@components/interfaces/Controlled/InputControlled";
import { useEffect, useState, useMemo } from "react";
import api from "@servicesOther/axios.api";
import { toast } from "@functions/toast/toast";
import Input from "@components/interfaces/Input";

type Book = {
  _id: string;
  bookName: string;
  mrp: number;
  quantity: number;
};

function CreateOrder({ close }: any) {
  const { loading } = useStudentApi();
  const { revalidate } = useRevalidator();

  const [books, setBooks] = useState<Book[]>([]);
  const [searchText, setSearchText] = useState("");
  const [orderSummary, setOrderSummary] = useState({
    totalQuantity: 0,
    totalPrice: 0,
  });

  const { control, handleSubmit, setValue, watch, trigger, getValues } =
    useForm<any>({
      defaultValues: {
        books: [],
        quantities: {},
      },
    });

  // Fetch books
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/admin/getBooks");
        const data = (res.data || []).map((b: any) => ({
          ...b,
          mrp: Number(b.mrp) || 0,
          quantity: Number(b.quantity) || 0,
        }));
        setBooks(data);
      } catch (err) {
        console.error("Failed to fetch books", err);
      }
    })();
  }, []);

  const selectedBooks = watch("books") || [];
  const quantities = watch("quantities") || {};

  // Filter books
  const filteredBooks = useMemo(() => {
    if (!searchText.trim()) return books;
    return books.filter((b) =>
      b.bookName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [books, searchText]);

  // ✅ Update order summary whenever books or quantities change
  useEffect(() => {
    const currentQuantities = getValues("quantities");
    const currentSelected = getValues("books");

    let totalQuantity = 0;
    let totalPrice = 0;

    books.forEach((book) => {
      if (currentSelected.includes(book._id)) {
        const qty = Number(currentQuantities?.[book._id] || 0);
        if (qty > 0) {
          totalQuantity += qty;
          totalPrice += book.mrp * qty;
        }
      }
    });

    setOrderSummary({
      totalQuantity,
      totalPrice,
    });
  }, [books, selectedBooks, quantities, getValues]);

  // ✅ Update quantity & trigger recalculation
  const handleQuantityChange = (bookId: string, value: any) => {
    const num = Number(value);
    setValue(`quantities.${bookId}`, isNaN(num) ? 0 : num, {
      shouldDirty: true,
      shouldValidate: true,
    });

    // Trigger watch manually so order summary re-renders immediately
    const current = getValues("quantities");
    current[bookId] = num;
    setValue("quantities", { ...current });
  };

  const submitForm = async (data: any) => {
    const selected = data.books || [];
    const invalid = selected.some((id: string) => {
      const q = data.quantities?.[id];
      return !q || Number(q) <= 0;
    });
    if (invalid) {
      await trigger();
      return;
    }

    const items = selected.map((id: string) => {
      const book = books.find((b) => b._id === id);
      const qty = Number(data.quantities?.[id] || 0);
      return {
        bookId: id,
        name: book?.bookName,
        qty,
        unitPrice: book?.mrp || 0,
        totalPrice: (book?.mrp || 0) * qty,
      };
    });

    const payload = {
      items,
      totalQuantity: items.reduce((a: any, b: any) => a + b.qty, 0),
      totalPrice: items.reduce((a: any, b: any) => a + b.totalPrice, 0),
    };

    api.post("/admin/createOrder", payload).then((res) => {
      if (res.status === 200) {
        toast.success("Order created successfully");
        close(false);
        revalidate();
      }
    });

    close(false);
    revalidate();
    window.location.reload();
  };

  return (
    <Modal open={true} className="!max-w-[45pc]" size="1">
      <ScrollArea type="hover" scrollbars="vertical">
        <form
          className="space-y-3 sm:space-y-6 p-2 sm:p-5"
          onSubmit={handleSubmit(submitForm)}
        >
          {/* Header */}
          <div className="mb-4 sm:mb-6 flex justify-between">
            <div>
              <h3 className="font-semibold tracking-tight text-xl">
                Create Order
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Select books and their quantities
              </p>
            </div>
            <MdClose
              onClick={() => close(false)}
              className="cursor-pointer"
              size={22}
            />
          </div>

          {/* 🔍 Search box */}
          <div className="flex gap-2 justify-between items-center">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Search Book
            </label>
            <Input
              value={searchText}
              name="searchBook"
              onChange={(e: any) => setSearchText(e.target.value)}
              placeholder="Search book name"
            />
          </div>

          {/* 📚 Book list */}
          <div className="border border-gray-200 dark:border-gray-700 p-2 rounded-md flex flex-col gap-2 h-[20pc] overflow-auto mt-4">
            {filteredBooks.length === 0 && (
              <div className="text-center text-gray-400 py-4">
                No books found
              </div>
            )}

            {filteredBooks.map((book: any) => {
              const isSelected = selectedBooks.includes(book._id);
              return (
                <div
                  key={book._id}
                  className="dark:bg-gray-800 bg-gray-200 p-2 rounded-md flex justify-between items-center"
                >
                  <div className="flex gap-3 items-center">
                    <img src={book.bookImage} className="w-12 h-16" alt="" />
                    <Controller
                      control={control}
                      name="books"
                      render={({ field }) => {
                        const current = Array.isArray(field.value)
                          ? field.value
                          : [];
                        const checked = current.includes(book._id);

                        const toggleCheckbox = () => {
                          const updated = checked
                            ? current.filter((id) => id !== book._id)
                            : [...current, book._id];
                          field.onChange(updated);

                          // Reset or set default quantity
                          if (checked) {
                            setValue(`quantities.${book._id}`, undefined);
                          } else {
                            setValue(`quantities.${book._id}`, 0, {
                              shouldValidate: true,
                            });
                          }
                        };

                        return (
                          <Checkbox
                            checked={checked}
                            onCheckedChange={toggleCheckbox}
                          />
                        );
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="italic">{book.bookName}</span>
                      <span className="font-semibold">₹{book.mrp}</span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <span className="text-sm font-semibold text-gray-200">
                      (available: {book.quantity})
                    </span>
                    {isSelected && (
                      <div className="flex gap-2 items-center">
                        <span>Qty:</span>
                        <input
                          type="number"
                          min={1}
                          className="w-20 rounded border px-2 py-1 dark:bg-gray-700"
                          value={quantities?.[book._id] || 0}
                          onChange={(e) =>
                            handleQuantityChange(book._id, e.target.value)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 🧾 Order Summary */}
          <div className="mt-4 p-4 dark:bg-gray-700 rounded-md">
            <span className="font-semibold">Order Summary</span>
            <div className="mt-2 flex justify-between">
              <span>Total Books: {orderSummary.totalQuantity}</span>
              <span>Total: ₹{orderSummary.totalPrice}</span>
            </div>
            <hr className="mt-2 mb-2" />
            <div className="flex justify-between font-semibold">
              <span>Final Total</span>
              <span>₹{orderSummary.totalPrice}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={() => close(false)}
              variant="soft"
              size="3"
              radius="medium"
              color="gray"
              disabled={loading}
            >
              Close
            </Button>
            <Button
              type="submit"
              disabled={loading}
              variant="solid"
              size="3"
              radius="medium"
            >
              Create Order
            </Button>
          </div>
        </form>
      </ScrollArea>
    </Modal>
  );
}

export default CreateOrder;
