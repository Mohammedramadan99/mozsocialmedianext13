
// import { ArrowRight } from "@mui/icons-material"
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

function MainAlert() {
  return (
    <>
      <div className='mainAlert' style={{padding:"5px",fontSize: "12px",fontWeight:"600",color:"white",textAlign:"center"}}>
        <WarningAmberIcon/>
        some actions will be <span> slow </span> because I use <span> the Shared Cluster </span> of mongodb (free)
      </div>
      {/* <div className='version' style={{ position: "fixed", bottom: "0", color: "#e4861b", fontWeight: "700", padding: "5px", fontSize: "15px", textAlign: "center", zIndex: "2000" }}>
      <div className="box">
          v 1.5
          <div className="info">
            <h3>in v 1.6</h3>
            <ul>
              <li><ArrowRight/> some components will be updated</li>
              <li><ArrowRight /> loading actions are gonna be edited</li>
              <li><ArrowRight /> better UI </li>
            </ul>  
          </div>
        </div>
      </div> */}
    </>
  )
}

export default MainAlert