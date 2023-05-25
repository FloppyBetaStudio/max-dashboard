import {Input, Button, Grid, Col, Loading, Modal, Text} from '@nextui-org/react'
import {useState} from 'react'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {redirect} from "next/navigation";

export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [loginMessageVisible, setLoginMessageVisible] = useState(false);
    const [loginMessage, setLoginMessage] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isLoading) {
            return;
        }
        setIsLoading(true)
        // console.log('username:', username)
        // console.log('password:', password)
        let response = await fetch(process.env.BaseURL+"/auth/login", {
            method: "POST",
            body: JSON.stringify({"username": username, "password": password}),
            headers: {
                "Content-Type": "application/json"
            }
        })

        let json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setLoginMessage(json.message)
            setLoginMessageVisible(true);
            return;
        }

        //登录成功
        localStorage.setItem("token", json.token)
        localStorage.setItem("token_expire", json.expire)
        localStorage.setItem("username", username)
        window.location.href="dash"
    }



    return (<>
            <Loading size="xl" style={{
                display: isLoading ? "flex" : "none",
                justifyContent: 'center'
            }}/>
            <Modal
                closeButton
                blur
                aria-labelledby="modal-title"
                open={loginMessageVisible}
                onClose={function(){setLoginMessageVisible(false)}}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        登录失败
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <a>{loginMessage}</a>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto onPress={function(){setLoginMessageVisible(false)}}>
                        确认
                    </Button>
                </Modal.Footer>
            </Modal>
            <form onSubmit={handleSubmit}>
                <Grid.Container gap={4} justify="center">
                    <Col>
                        <Grid style={{
                            display: isLoading ? "none" : "block"
                        }}>
                            <Input
                                rounded
                                bordered
                                placeholder="玩家名称"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                width="100%"
                                size="lg"
                                aria-label="InputUsername"
                                id="InputUsername"
                            /></Grid>
                        <Grid style={{
                            display: isLoading ? "none" : "block"
                        }}>
                            <Input.Password
                                rounded
                                bordered
                                placeholder="登录密码"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                width="100%"
                                size="lg"
                                aria-label="InputPassword"
                                id="InputPassword"
                            /></Grid>
                        <Grid style={{
                            display: isLoading ? "none" : "block"
                        }}><Button type="submit" size="lg" shadow color="gradient" aria-label="ActionSubmit">登录</Button>
                        </Grid>
                    </Col>
                </Grid.Container>
            </form>
        </>
    )
}
