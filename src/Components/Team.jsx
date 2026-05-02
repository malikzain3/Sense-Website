import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TeamMemberInfo from './TeamMemberInfo'
import "./Team.css"
import { supabase } from "../supabase";

const Team = () => {
  const navigate = useNavigate();
  const [topFour, setTopFour] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      const { data } = await supabase.from('team').select('*').order('rank', { ascending: true }).limit(3);
      if (data) setTopFour(data);
    };
    fetchTeam();
  }, []);

  return (
    <div id='Team'>
      <div className="Team-Heading">Our Team</div>
      <div className="Team-content">
        <div className="Team-Text">Meet Our Prestigious Team</div>
        <div className="Team-Member">
          {topFour.map((member) => (
            <div key={member.id} className={`member-card-wrapper ${member.rank === '1' ? 'pres' : member.rank === '2' ? 'vp' : member.rank === '3' ? 'gs' : ''}`}>
              <TeamMemberInfo 
                Image={member.image_url}
                Name={member.name}
                Designation={member.role}
                Category={member.category}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="More-Team-Button">  
        <button onClick={() => navigate('/TeamPage')}>See Our Team</button>
      </div>
    </div>
  )
}

export default Team