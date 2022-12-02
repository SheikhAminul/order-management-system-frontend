import * as React from 'react'

export default function LoadingAnimation({ className }: { className: string }) {
    return (
        <div className={`absolute top-0 left-0 w-full h-full text-center bg-white flex justify-center items-center ${className || ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 m-auto" viewBox="0 0 100 100">
                <circle strokeLinecap="round" cx="50" cy="50" fill="none" stroke="rgb(59 130 246)" strokeWidth="6" r="45" strokeDasharray="212.05750411731105 72.68583470577035">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                </circle>
            </svg>
        </div>
    )
}