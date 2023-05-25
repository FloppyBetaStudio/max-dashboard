import {useEffect, useState} from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {Button, Card, Grid, Text, Col, Spacer} from "@nextui-org/react";
import {redirect} from "next/navigation";
import Link from "next/link";

export default function Dash() {
    const [userBalance, setUserBalance] = useState()



    useEffect(  () => {
        async function fetchData(){
            let response = await fetch(process.env.BaseURL + "/money", {
                method: "GET",
                headers: {"Authorization": localStorage.getItem("token"), "Content-Type": "application/json"}
            }).catch()
            if(response.status === 401){
                window.location.href="login"
            }
            let json = await response.json()
            setUserBalance(json.balance)
        }
        fetchData();

    }, [])

    const QuickLoginGame = async () => {
        let response = await fetch(process.env.BaseURL + "/game/auth",
            {
                method: "POST",
                headers: {
                    "Authorization": localStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"username": localStorage.getItem("username")})
            }).catch()
        if (response.ok) {
            alert("登录完毕")
        }else{
            let json = await response.json()
            alert("登录失败:"+json.message)
        }
    }


    return(<>
        <Grid.Container gap="4">
            <Col>
            <Grid>
                <Text h2>仪表盘</Text>
            </Grid>
            <Grid>
                <Card>
                    <Card.Header>
                        <Text h3>账户信息</Text>
                    </Card.Header>
                    <Card.Body>
                        <p>名称: {localStorage.getItem("username")}</p>
                        <p>存款: {userBalance}</p>
                        <Spacer y={2} />
                        <p><Link href="/pay"><Button>转账</Button></Link></p>
                        <Spacer y={1} />
                        <p><Link href="/security"><Button>账户安全</Button></Link></p>
                    </Card.Body>

                </Card>
                <Card>
                    <Card.Header>
                        <Text h3>快捷登录</Text>
                    </Card.Header>
                    <Card.Body>
                        <p><Button onPress={QuickLoginGame}>一键登入游戏</Button></p>
                    </Card.Body>
                </Card>
            </Grid>
            </Col>
        </Grid.Container>

    </>)
}