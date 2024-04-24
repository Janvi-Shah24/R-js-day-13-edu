import React, { useState } from 'react';
import {employees} from './Data'
import './App.css'

// console.log(employees)

// const employees = Data;
function App() {
  const [teamMembers, setTeamMembers] = useState([]);

  const handleAdd = (id) => {
    const member = employees.find(emp => emp.id === id);
    setTeamMembers([...teamMembers, member]);
  };

  const handleRemove = (id) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const calculateAverageAge = () => {
    if (!teamMembers.length) return 0;
    const totalAge = teamMembers.reduce((acc, member) => acc + member.age, 0);
    return (totalAge / teamMembers.length).toFixed(2);
  };

  const sortTeamByAge = () => {
    const sortedTeam = [...teamMembers].sort((a, b) => a.age - b.age);
    setTeamMembers(sortedTeam);
  };



    return (
      <div className="App">
        <EmployeeList className="card" employees={employees} teamMembers={teamMembers} onAdd={handleAdd} />
        <TeamMembers className="card" members={teamMembers} onRemove={handleRemove} averageAge={calculateAverageAge()} onSortAge={sortTeamByAge} />
      </div>
    );
  }
  
  function EmployeeList({ employees, teamMembers, onAdd }) {
    return (
      <div className="card">
        <h2>Employees</h2>
        {employees.map(emp => (
          <div key={emp.id} className={`employee-item ${teamMembers.some(m => m.id === emp.id) ? 'dimmed' : ''}`}>
            <p>{`${emp.first_name} ${emp.last_name} (Age: ${emp.age})`}</p>
            {!teamMembers.some(m => m.id === emp.id) && (
              <button onClick={() => onAdd(emp.id)}>Add</button>
            )}
          </div>
        ))}
      </div>
    );
  }
  
  function TeamMembers({ members, onRemove, averageAge, onSortAge }) {
    return (
      <div className="card">
        <h2>Team Members</h2>
        <button className="sort-button" onClick={onSortAge}>Sort by Age</button>
        <p className="average-age">Average Age: {averageAge}</p>
        {members.map(member => (
          <div key={member.id} className="team-member">
            <p>{`${member.first_name} ${member.last_name} (Age: ${member.age})`}</p>
            <button onClick={() => onRemove(member.id)}>Remove</button>
          </div>
        ))}
      </div>
    );
  }
  


  



export default App;