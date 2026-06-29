import React from 'react'
import "./TeamMemberInfo.css"

const TeamMemberInfo = ({
    Image,
    Name,
    Designation,
    Category
}) => {
  return (
    <div className='TeamMemberInfo-Card'>
        <div className="Team-Member-Image">
            <img src={Image} />
        </div>
        <div className="Team-Member-Name">
            {Name}
        </div>
        <div className="Team-Member-Designation">
           {Designation}
        </div>
        {Category && (
            <div className="Team-Member-Category">
                {Category === "Cabinet" ? "Cabinet Member" : " Team Member"}
            </div>
        )}
    </div>
  )
}

export default TeamMemberInfo
