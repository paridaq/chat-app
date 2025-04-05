
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useState } from "react";


interface message{
    username:string;
    text:string;
}


function ChatSpace(){

    const[message,setMessage] = useState<string>('')
    const[id,setId] = useState<string>('');


    const[messages,setMessages]= useState<message[]>([])

    //if socket is defined outside the space of the chAT SPACE COMPONENT IT may not work
    const socketRef = useRef(io('https://chat-app-9xhz.vercel.app/', { autoConnect: false }));
       
    console.log(messages)
const username = localStorage.getItem('user-name') || "Anonymous";

    useEffect(()=>{
       
       
        const socket = socketRef.current;

        socket.connect();

        socket.on('connect', () => {
            alert("connected");
            setId(socket.id || '');
        });

        socket.emit('joined', { username });

        socket.on('welcome', (data) => {
            // setMessages((prevMessages) => [...prevMessages, {username:data.user || "pad",text:data.message}]);
            setMessages([{username:data.user || "hey", text:data.message}])
            console.log(data.user, data.message);
        });

        socket.on('userjoined', (data) => {
            // setMessages((prevMessages) => [...prevMessages, {username:data.user ||"pad",text:data.message}]);
            setMessages([{username:data.user || "admin", text:data.message}])
            console.log(data.user, data.message);
        });

        socket.on('leave', (data) => {
            setMessages((prevMessages) => [...prevMessages, {username:data.user || "pad",text:data.message}]);
            console.log(data.user, data.message);
        });

        return () => {
            socket.disconnect();
            socket.off();
        };
    }, []);

    const send = () => {
        if(message===''){
            alert(`type something`)
            return
        }
    socketRef.current.emit('message', { message, id });
    // setMessages((prevMessages) => [...prevMessages, { username: username as string, text: message }]);
        setMessage('');
    };
    
        // useEffect(() => {
        //     const socket = socketRef.current;
    
        //     socket.on('sendmessage', (data) => {
                
        //         setMessages((prevMessages) => [...prevMessages, { username: data.user || "pad", text: data.message }]);
        //         console.log(data.user, data.message, data.id);
        //     });

        //     return () => {
        //         socket.off('sendmessage');
        //     };
        // }, []);



        useEffect(() => {
            const socket = socketRef.current;
    
            // Define the event handler
            const handleSendMessage = (data: { user: string; message: string; id: string }) => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { username: data.user || "Anonymous", text: data.message },
                ]);
                console.log(data.user, data.message, data.id);
            };
    
            // Register the listener
            socket.on('sendmessage', handleSendMessage);
    
            // Cleanup the listener when the component unmounts or the effect re-runs
            return () => {
                socket.off('sendmessage', handleSendMessage);
            };
        }, []);
    
    
        return (
            <>
                <h1> {username}</h1>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "500px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "15px",
                        overflow: "hidden",
                    }} 
                >
                    <div
                        style={{
                            flex: 1,
                            overflowY: "auto",
                            marginBottom: "15px",
                            padding: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                        }}
                    >
                        {messages.map((msg, index) => (
                            <div key={index} style={{ marginBottom: "10px" }}>
                                <strong>{msg.username}</strong>
                                <p style={{ margin: 0 }}>{msg.text}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{
                                flex: 1,
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                marginRight: "15px",
                            }}
                        />
                        <button
                            onClick={send}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </>
        );

        
    
}
export default ChatSpace