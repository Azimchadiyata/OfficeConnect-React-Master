import React, { useState } from 'react';

const AddMemberForm = ({ addMember }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [balance, setBalance] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addMember({ name, age, balance, company, status });
    setName('');
    setAge('');
    setBalance('');
    setCompany('');
    setStatus('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="Balance"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
      />
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <button type="submit">Add New Member</button>
    </form>
  );
};

export default AddMemberForm;
