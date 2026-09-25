import React, { useState } from 'react';

export default function OrganizationPage() {
  const [showPending, setShowPending] = useState(false);

  return (
    <div>
      <h1>Organization Settings</h1>
      <p>Manage your team members, roles, and access levels.</p>
      
      <button onClick={() => setShowPending(!showPending)}>
        {showPending ? "Hide Pending Users" : "View Pending Users"}
      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mohamed Riyanudeen</td>
            <td>AWS Solutions Architect</td>
            <td>Active</td>
          </tr>
          {showPending && (
            <tr>
              <td>System Account</td>
              <td>Read-Only</td>
              <td>Pending</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}