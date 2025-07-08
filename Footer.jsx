import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import img from '../img/logo.jpg.png'
import '../style/Main.css'
import img1 from '../img/chat1.jpg'

const Footer = () => {
    const nav = useNavigate();
    return (

        <div id="div1">
            <footer id="footer">
                <span id="search" onClick={() => { nav('/cooker') }}>
                    👨‍🍳
                </span>

                <span id="chat" onClick={() => { nav('/chat') }}>
                    💬
                </span>
                <span id="my" onClick={() => { nav('/my') }}>
                    📞
                </span>
            </footer>
        </div>

    )
}

export default Footer