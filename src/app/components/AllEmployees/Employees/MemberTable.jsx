import React from 'react';

const MemberTable = ({ members, editMember, deleteMember }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Balance</th>
          <th>Company</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member, index) => (
          <tr key={index}>
            <td>{member.name}</td>
            <td>{member.age}</td>
            <td>{member.balance}</td>
            <td>{member.company}</td>
            <td>{member.status}</td>
            <td>
              <button onClick={() => editMember(index)}>Edit</button>
              <button onClick={() => deleteMember(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MemberTable;
