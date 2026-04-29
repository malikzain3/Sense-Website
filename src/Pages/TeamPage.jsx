import React, { useEffect, useState } from 'react'
import TeamMemberInfo from '../Components/TeamMemberInfo'
import "./TeamPage.css"
import { supabase } from "../supabase";

const TeamPage = () => {
  const [cabinet, setCabinet] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const fetchTeam = async () => {
      const { data } = await supabase.from('team').select('*').order('rank', { ascending: true });
      if (data) {
        setCabinet(data.filter(m => m.category === 'Cabinet'));
        setTeam(data.filter(m => m.category === 'Team'));
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className='team-page-wrapper' style={{paddingTop: '120px'}}>
      <div className="team-section">
        <h2 className="section-title">Executive <span>Cabinet</span></h2>
        <div className="Team-Member" style={{flexWrap: 'wrap'}}>
          {cabinet.map((member) => (
            <div key={member.id} className={`member-card-wrapper ${member.rank === '1' ? 'pres' : member.rank === '2' ? 'vp' : member.rank === '3' ? 'gs' : ''}`}>
              <TeamMemberInfo Image={member.image_url} Name={member.name} Designation={member.role} Category={member.category} />
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider-line"></div>

      <div className="team-section">
        <h2 className="section-title">Our <span>Core Team</span></h2>
        <div className="Team-Member" style={{flexWrap: 'wrap'}}>
          {team.map((member) => (
            <div key={member.id} className="member-card-wrapper">
              <TeamMemberInfo Image={member.image_url} Name={member.name} Designation={member.role} Category={member.category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeamPage