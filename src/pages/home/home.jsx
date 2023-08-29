import TextField from '../../components/TextField';
import Button from "../../components/Button";
import Typography from "../../components/Typography";
import SideBar from "../../components/SideBar";
import "./home.css"
import Event from '../../components/Event';


function Home(){
    const options = [{title: "There are no options yet"}]


    return(
        <div className={"container-div"}>
            <SideBar currentPage={"Events"}/>
            <div className={"right-hand-side"}>
                <div className={"page-title"}>
                    <Typography variant={"h5"}>My Events</Typography>
                </div>
                <div className={"search"}>
                    <TextField style={{width:"400px"}} placeholder={"Search by name, description or invited people."} />
                    <div className={"search-button"}>
                        <Button text={"Search"} style={{height:"50px"}}/>
                    </div>
                </div>
                <div className={"events"}>
                    <Event name={"Jane's Birthday Party"} invitationAmount={14} date={new Date('2023-09-15')}/>
                    <Event name={"Joe's Birthday Party"} invitationAmount={12} date={new Date('2023-09-03')} status={"confirmed"}/>
                    <Event name={"Bob's Birthday Party"} invitationAmount={12} date={new Date('2023-09-03')} status={"confirmed"}/>
                    <Event name={"Frank's Birthday Party"} invitationAmount={12} date={new Date('2023-09-03')} status={"confirmed"}/>
                    <Event name={"Sophie's Birthday Party"} invitationAmount={12} date={new Date('2023-09-03')} status={"confirmed"}/>

                </div>
            </div>
        </div>
    )
}
export default Home;