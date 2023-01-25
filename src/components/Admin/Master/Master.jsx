import react from 'react';
import { useNavigate } from "react-router-dom";
function Master(){
    const navigate = useNavigate();
return(<div>
    <div className='w-[200px] h-[200px] bg-[#dbec29] mx-auto' onClick={()=>{navigate('/addmobile')}} >
<p >Add Mobile No</p>
    </div>
</div>)
}
export default Master;