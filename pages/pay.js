import {Input, Grid, Spacer, Text, Col, Button, Checkbox, Loading} from "@nextui-org/react";
import {useState} from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Pay() {
    const [targetUsername, setTargetUsername] = useState("")
    const [moneyAmount, setMoneyAmount] = useState(0)
    const [confirmPay, setConfirmPay] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(isLoading){
            return
        }
        setIsLoading(true)

        if (!confirmPay) {

            alert("请勾选确认支付以避免误操作的转账")
            setIsLoading(false)
            return;
        }

        if (targetUsername == "") {
            alert("用户名不得为空");
            setIsLoading(false)
            return;
        }
        if (!(moneyAmount > 0)) {
            alert("金额应大于0");
            setIsLoading(false)
            return;
        }
        console.log("向", targetUsername, "转账", moneyAmount)

        let response = await fetch(process.env.BaseURL + "/money/pay/" + targetUsername,
            {
                method: "POST",
                headers: {
                    "Authorization": localStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"amount": moneyAmount})
            }).catch(error => {
        })
        let json = await response.json()
        if (!response.ok) {
            alert("交易失败，错误信息：" + json.message)
            setIsLoading(false)
            return
        }
        alert("完成");
        setIsLoading(false)
    }
    return (<>
        <Loading size="xl" style={{
            display: isLoading ? "flex" : "none",
            justifyContent: 'center'
        }}/>
        <Grid.Container gap="2" style={{display: isLoading ? "none" : "flex"}}>
            <Col>
                <form onSubmit={handleSubmit}>
                    <Grid>
                        <Text h2>付款</Text>
                    </Grid>
                    <Grid>
                        <Input
                            rounded
                            bordered
                            value={targetUsername}
                            id="inputUsername"
                            placeholder="对方用户名"
                            label="对方用户名"
                            onChange={(e) => {
                                setTargetUsername(e.target.value)
                            }}
                            width="80%"
                            aria-label="InputUsername"
                        ></Input></Grid>
                    <Grid><Input
                        rounded
                        bordered
                        value={moneyAmount}
                        id="inputMoneyAmount"
                        placeholder="金额"
                        label="金额"
                        onChange={(e) => {
                            setMoneyAmount(e.target.value)
                        }}
                        width="80%"
                        aria-label="InputAmount"
                        type="number"
                    ></Input></Grid>
                    <Grid>
                        <Grid>
                            <Checkbox onChange={function (e) {
                                setConfirmPay(e.valueOf())
                            }} value={confirmPay}>确认转账</Checkbox>
                        </Grid>
                        <Button type="submit" aria-label="ActionSubmit">确认转账</Button></Grid>
                </form>
            </Col>
        </Grid.Container>

    </>)
}