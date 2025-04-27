export function Button({ reason, onClick }) {
    return (
        <button onClick={onClick} className="w-5 pb-0.5 h-5 hover:bg-gray-950 bg-gray-600 rounded-full flex justify-center items-center cursor-pointer">{reason}</button>
    )
}