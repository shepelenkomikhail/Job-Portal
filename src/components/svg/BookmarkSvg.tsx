export default function BookmarkSvg({saved}: {saved: boolean}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill={saved ? "#F9E796" : "#ffffff"}
             width="40"
             height="40"
             viewBox="-5 -2 24 24"
             stroke="#000000">
            <path
                d="M3 0h8a3 3 0 0 1 3 3v15a2 2 0 0 1-3.348 1.477L7.674 16.76a1 1 0 0 0-1.348 0l-2.978 2.717A2 2 0 0 1 0 18V3a3 3 0 0 1 3-3z"/>
        </svg>
    );
}