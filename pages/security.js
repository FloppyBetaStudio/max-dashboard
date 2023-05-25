import {Grid, Text, Input, Loading, Col, Button} from "@nextui-org/react"
import {useState} from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
export default function Security(){
    const [newPassword, setNewPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const changePasswordHandler = async (event) => {
        event.preventDefault()
        if (newPassword.length < 6) {
            alert("密码太短")
            return;
        }
        setIsLoading(true)
        let response = await fetch(process.env.BaseURL + "/auth/changePassword",
            {
                method: "POST",
                headers: {"Authorization": localStorage.getItem("token"), "content-type": "application/json"},
                body: JSON.stringify({"password": newPassword})
            }).catch()
        let json = response.json()
        if (!response.ok){
            alert("修改失败:"+json.message)
            setIsLoading(false)
            return
        }
        alert("修改完毕")
        setIsLoading(false)

    }

    const logoutAllHandler = async (event) => {
        setIsLoading(true)
        let response = await fetch(process.env.BaseURL + "/auth/login", {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "content-type": "application/json"
            },
        }).catch()
        let json = response.json()
        if(!response.ok){
            alert("失败:"+json.message)
            setIsLoading(false)
            return
        }

        localStorage.clear()
        alert("完成")
        window.location.href="login"

    }
    return(<>
        <Text h2>账户安全</Text>
        <Grid.Container gap="2" style={{display: isLoading ? "none" : "flex"}}>
            <Col>
            <Grid>
            <Text h3>修改密码</Text></Grid>
            <Grid>
            <Loading size="xl" style={{
                display: isLoading ? "flex" : "none",
                justifyContent: 'center'
            }}/></Grid>
                <form onSubmit={changePasswordHandler}>
            <Grid>
                <Input.Password
                    rounded
                    bordered
                    value={newPassword}
                    id="inputNewPassword"
                    placeholder="新密码"
                    label="新密码"
                    onChange={(e) => {
                        setNewPassword(e.target.value)
                    }}
                    width="80%"
                    aria-label="InputNewPassword"
                ></Input.Password>

            </Grid>
                    <Grid>
                        <Button type="submit" aria-label="ActionSubmitPassword">确认修改密码</Button>
                    </Grid>
                </form>
                <Grid>
                    <Text h2>会话</Text>
                    <Button type="submit" aria-label="ActionLogoutAll" onPress={logoutAllHandler}>从所有设备登出</Button>
                </Grid>
            </Col>
        </Grid.Container>
    </>)
}