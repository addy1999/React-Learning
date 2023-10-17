import React from 'react';

export default function TicketForm({
  subject = '',
  contactEmail = '',
  description = '',
  owner = '',
  status = '',
  ticketAction,
  onTicketValueChange,
  onTicketCreate,
  handleTicketEdit,
  ticket,
}) {
  return (
    <div>
      <form class="row g-3">
        <div class="col-md-6">
          <label class="form-label" for="subject">
            Subject
          </label>
          <input
            type="text"
            class="form-control"
            id="subject"
            value={ticket.subject}
            onChange={(e) => {
              onTicketValueChange('subject', e.target);
            }}
          />
        </div>
        <div class="col-md-6">
          <label class="form-label" for="contactEmail">
            Contact Email
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            value={ticket.contactEmail}
            onChange={(e) => onTicketValueChange('contactEmail', e.target)}
          />
        </div>
        <div class="col-12">
          <label for="description" class="form-label">
            Description
          </label>
          <textarea
            class="form-control"
            id="description"
            value={ticket.description}
            onChange={(e) => onTicketValueChange('description', e.target)}
          />
        </div>
        <div class="col-md-6">
          <label for="inputOwner" class="form-label">
            Owner
          </label>
          <select
            id="inputOwner"
            class="form-select"
            value={ticket.owner}
            onChange={(e) => onTicketValueChange('owner', e.target)}
          >
            <option selected> Addy </option>
            <option> Pandi </option>
            <option> Palpandi </option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="inputStatus" class="form-label">
            Status
          </label>
          <select
            id="inputSelect"
            class="form-select"
            value={ticket.status}
            onChange={(e) => onTicketValueChange('status', e.target)}
          >
            <option selected> Open </option>
            <option> Closed </option>
          </select>
        </div>
        <div>
          {ticketAction === 'AddTicket' ? (
            <button
              type="button"
              class="btn btn-secondary"
              onClick={() => onTicketCreate(ticket)}
            >
              Add Ticket
            </button>
          ) : (
            <button
              type="button"
              class="btn btn-secondary"
              onClick={() => handleTicketEdit(ticket)}
            >
              Edit Ticket
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
