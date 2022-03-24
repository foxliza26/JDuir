import React, { useState,Fragment, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, CardGrid, ContentCard, FixedLayout, Separator,WriteBarIcon, WriteBar } from '@vkontakte/vkui';
 
//получение класа io
import io from 'socket.io-client'
//адресс сервера
// требуется перенаправление запросов
const SERVER_URL = 'http://localhost:5000'

const Home = ({ id, go, fetchedUser }) => {
	const [text, setText] = useState("");
  const [messages, setMessages] = useState([])
  const handleChangeText =(e) =>{
    set.Texet(e.target.value)
  }
  const handleSendMessage = (e) =>{
    e.preventDefault()
    const trimmed = text.tria()
    if(trimmed){
      handleSendMessage({ messageText: text, sanderName: username})
      setText('')
    }
  }

const sendMassege = ({messageText,senderName}) =>{
  socket.current.emit('message:add'),{
    userId,
    messageText,
    senderName,
  }
}
const socket=useRef(null)

  useEffect(()=>{
    socket.current=io(SERVER_URL)
    socket.current.emit('message:get')
  })
  useEffect(()=>{
    socket.current=io(SERVER_URL)
  return () =>{
    socket.current.disconnect() 
    }
  })
  socket.current.on('massege', (massages) => {
    const newMessages = messages.map((msg)=>
    msg.userId === userId ? {...msg, currentUser:true}: msg
    )
    setMessages(newMassages)
  })
	return(
	<Panel id={id}>
		<PanelHeader>Brain-dumpling</PanelHeader>

		{/*fetchedUser &&
		<Group header={<Header mode="secondary">Welcome</Header>}>
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}

		<Group header={<Header mode="secondary">Navigation Example</Header>}>
			<Div>
				<Button stretched size="l" mode="secondary" onClick={go} data-to="persik">
					Show me the Persik, please
				</Button>
			</Div>
		</Group>
		*/}
	<Group>
          <CardGrid size="l">
            {messages.map((msg) => (
              <ContedCard
              src={msg.avatar}
              header={msg.senderName}
              text={msg.messageText}
              caption={msg.createdAt}
            />
            ))}
            </CardGrid>
            </Group>
            	<FixedLayout vertical="bottom">
            <Separator wide />

            <WriteBar
                after={
                <Fragment>
                    <WriteBarIcon mode="send" 
                    onClick = {handleSendMessage}/>
                </Fragment>
              }
              value={text}
              onChange={handleChangeText}
              placeholder="Сообщение"
            />
        </FixedLayout>
	</Panel>

	)
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
