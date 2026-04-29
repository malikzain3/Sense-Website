import React, { useEffect } from 'react'
import TeamMemberInfo from '../Components/TeamMemberInfo'
import teamData from "../teamData.js"
import "./TeamPage.css"

const TeamPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const cabinet = teamData.filter(m => m.category === "Cabinet").sort((a,b) => a.rank - b.rank);
  const team = teamData.filter(m => m.category === "Team");

  return (
    <div className='team-page-wrapper' style={{paddingTop: '120px'}}>
      {/* Cabinet Section */}
      <div className="team-section">
        <h2 className="section-title">Executive <span>Cabinet</span></h2>
        <div className="Team-Member" style={{flexWrap: 'wrap'}}>
          {cabinet.map((member) => (
            <div key={member.id} className={`member-card-wrapper ${member.rank === 1 ? 'pres' : member.rank === 2 ? 'vp' : member.rank === 3 ? 'gs' : ''}`}>
              <TeamMemberInfo Image={member.image} Name={member.name} Designation={member.designation} Category={member.category} />
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider-line"></div>

      {/* Team Section */}
      <div className="team-section">
        <h2 className="section-title">Our <span>Core Team</span></h2>
        <div className="Team-Member" style={{flexWrap: 'wrap'}}>
          {team.map((member) => (
            <div key={member.id} className="member-card-wrapper">
              <TeamMemberInfo Image={member.image} Name={member.name} Designation={member.designation} Category={member.category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeamPage