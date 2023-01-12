import CloseIcon from "@mui/icons-material/Close"
import Friend from "./Friend"


function FollowPersons({ data, title, setShowFriends, showFriends }) {
  return (
    <div className={!showFriends.status ? "user__bottom__sidebar__followPersons hide" : "user__bottom__sidebar__followPersons active"}>
      <div className="user__bottom__sidebar__followPersons__overlay">
      <div className="user__bottom__sidebar__followPersons__overlay__modal">
        <div className="user__bottom__sidebar__followPersons__overlay__modal__close" onClick={() => setShowFriends(false)}> <CloseIcon /> </div>
          <div className="user__bottom__sidebar__followPersons__overlay__modal__title">
            {title}
          </div>
          <div className="user__bottom__sidebar__followPersons__overlay__modal__persons">
            {data?.map(item => (
              <Friend user={item} />  
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FollowPersons