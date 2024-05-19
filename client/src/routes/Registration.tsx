import {useApi} from "../api";

function Registration() {
	const api = useApi()
	return <>
		<button onClick={() => {
			api.login({ email: "mail@mail.ru", password:"wtf"}).then(console.log)
		}}>login</button>
	</>
}

export default Registration
