export default function AppliedBox({layout}: { layout: "grid" | "list" }) {
    return (
        <div
            className={`bottom-3 right-3 p-1.5 bg-blue-100 border border-blue-700 rounded-md 
                        ${layout === "grid" ? "w-full" : "absolute w-34 lg:w-40"}`}
            role="status"
            aria-live="polite"
        >
            <p className={"text-blue-900 font-semibold text-center"}>
                Applied!
            </p>
        </div>
    );
}