export default function Spinner(props)  {
    return (
        <>
        <div className={`lds-ripple ${props.fullpage ? "fullpage" : ""}`}><div></div><div></div></div>
        <style jsx>{`
            .lds-ripple {
                display: block;
                position: relative;
                width: 80px;
                height: 80px;
                margin: 0 auto;
            }
            .fullpage {
                position: absolute;
                top: 50%;
                left: 50%;
            }
            .lds-ripple div {
                position: absolute;
                border: 4px solid #fff;
                opacity: 1;
                border-radius: 50%;
                animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
            }
            .lds-ripple div:nth-child(2) {
                animation-delay: -0.5s;
            }
            @keyframes lds-ripple {
                0% {
                    top: 36px;
                    left: 36px;
                    width: 0;
                    height: 0;
                    opacity: 1;
                }
                100% {
                    top: 0px;
                    left: 0px;
                    width: 72px;
                    height: 72px;
                    opacity: 0;
                }
            }

      `}</style>
        </>
    )
}
