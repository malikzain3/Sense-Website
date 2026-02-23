import React from 'react'
import TeamMemberInfo from './TeamMemberInfo'
import President from "../assets/Person.jpg"
import "./Team.css"

const Team = ({props}) => {
  return (
    <div id='Team'>
      <div className="Team-Heading">
        Our Team
      </div>
      <div className="Team-content">
        <div className="Team-Text">
          Meet Our Prestigious Team
        </div>
        <div className="Team-Member">
          <TeamMemberInfo 
            Image={President}
            Name="Jhon Doe"
            Designation="President"
          />
          <TeamMemberInfo 
            Image={President}
            Name="Jhon Doe"
            Designation="President"
          />
          <TeamMemberInfo 
            Image={President}
            Name="Jhon Doe"
            Designation="President"
          />
          
        </div>
      </div>
      <div className="More-Team-Button">
        <button>See OurCore Team</button>
      </div>
    </div>
  )
}

export default Team
