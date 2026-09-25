import React from 'react';

export default function OrganizationPage() {
  return (
    <div>
      <h1>Organization Settings</h1>
      <p>Manage your team members and their account statuses here.</p>
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
            <td>Admin</td>
            <td>Active</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}