import React from 'react';

export default function OrganizationPage() {
  return (
    <div className="org-container">
      <h1>EIT Organization Details</h1>
      <table className="org-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            {/* We will test adding a new column here later */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mohamed</td>
            <td>Admin</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}