import React from 'react'
import { useNavigate } from 'react-router-dom'
import TeamMemberInfo from './TeamMemberInfo'
import teamData from "../teamData.js"
import "./Team.css"

const Team = () => {
  const navigate = useNavigate();
  
  // Rank ke hisab se sort karke top 4 nikaal liye
  const topFour = [...teamData].sort((a, b) => a.rank - b.rank).slice(0, 4);

  return (
    <div id='Team'>
      <div className="Team-Heading">Our Team</div>
      <div className="Team-content">
        <div className="Team-Text">Meet Our Prestigious Team</div>
        <div className="Team-Member">
          {topFour.map((member) => (
            <div key={member.id} className={`member-card-wrapper ${member.rank === 1 ? 'pres' : member.rank === 2 ? 'vp' : ''}`}>
              <TeamMemberInfo 
                Image={member.image}
                Name={member.name}
                Designation={member.designation}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="More-Team-Button">
        <button onClick={() => navigate('/TeamPage')}>See Our Core Team</button>
      </div>
    </div>
  )
}

export default Team