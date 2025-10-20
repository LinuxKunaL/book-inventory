import { useEffect } from "react";

export default function useBackButton(handler: () => void) {
    useEffect(() => {
        const onPopState = () => handler();
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, [handler]);
}
