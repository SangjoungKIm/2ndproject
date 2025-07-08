import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Search from './code/Search'
import My from './code/My'
import Main from './code/Main'
import Main_Sns from './code/Main_Sns'
import Main_Sizang from './code/Main_Sizang'
import Main_Infor from './code/Main_Infor'
import Main_Ask from './code/Main_ask'
import Chat from './code/Chat'
import Member from './code/Member'
import PassChange from './code/PassChange'
import PassChanges from './code/PassChanges'
import Main_Ask1 from './code/Main_ask1'
import Main_Ask2 from './code/Main_ask2'
import { AuthProvider } from './code/AuthContext.jsx';
import Cooker from './code/Cooker.jsx'
import DeleteAccount from './code/DeleteAccount.jsx'
import img from './img/back1.jpg'

const App = () => {
    return (
        
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Main />}></Route>
                    <Route path='/sns' element={<Main_Sns />}></Route>
                    <Route path='/search' element={<Search />}></Route>
                    <Route path='/my' element={<My />}></Route>
                    <Route path='/sizang' element={<Main_Sizang />}></Route>
                    <Route path='/infor' element={<Main_Infor />}></Route>
                    <Route path='/ask1' element={<Main_Ask1 />}></Route>
                    <Route path='/ask' element={<Main_Ask />}></Route>
                    <Route path='/ask2' element={<Main_Ask2 />}></Route>
                    <Route path='/chat' element={<Chat />}></Route>
                    <Route path='/member' element={<Member />}></Route>
                    <Route path='/passchange' element={<PassChange />}></Route>
                    <Route path='/passchanges' element={<PassChanges />}></Route>
                    <Route path='/cooker' element={<Cooker />}></Route>
                    <Route path='/delete-account' element={<DeleteAccount />}></Route>
                </Routes>
            </AuthProvider>
        
    )
}

export default App
