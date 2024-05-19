import {useApi} from "../api";

function Registration() {
	const api = useApi()
	return <>
		<button onClick={() => {
			api.login({email: "email@mail.ru", password: "wtf"}).then(console.log)
		}}>login
		</button>
		<br/>
		<button onClick={() => {
			api.register({email: "1@mail.ru", phone: "+123", name:"123123", password: "wtf"}).then(console.log)
		}}>login
		</button>
	</>
}

export default Registration
