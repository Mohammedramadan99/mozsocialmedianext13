
function Spinner({type})
{
    return (
    type === "full"  ? (
        <div className="full">
            <div className="spinner"></div>
        </div>
        ) : (
        <div className="spinner"></div> 
        )
    )
}

export default Spinner