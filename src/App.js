import React, { useState, useEffect } from 'react';
import TicketForm from './TicketForm.js';
import './style.css';

export default function App() {
  const DEFAULTVALUE = { owner: 'Addy', status: 'open' };
  const DEFAULTTICKET = {
    id: 101,
    subject: 'Default Ticket',
    description: 'This is a sample ticket',
    contactEmail: 'zylker@zohomail.com',
    ...DEFAULTVALUE,
  };
  const [page, setPage] = useState('TicketList');
  const [tickets, setTickets] = useState([DEFAULTTICKET]);
  const [ticket, setTicket] = useState(DEFAULTVALUE);
  const [ticketId, setTicketId] = useState(101);
  const [ticketAction, setTicketAction] = useState('addTicket');

  const onTicketCreate = (ticket) => {
    const nextId = getNextId();
    setTickets([{ ...ticket, id: nextId }, ...tickets]);
    setTicketId(nextId);
    setTicket(DEFAULTVALUE);
    setPage('TicketList');
  };

  const handleTicketEdit = (ticket) => {
    const filteredTickets = tickets.filter(
      (singleTicket) => singleTicket.id !== ticket.id
    );
    setTickets([ticket, ...filteredTickets]);
    setPage('TicketList');
  };

  const getNextId = () => {
    return ticketId + 1;
  };

  const handleDelete = (ticketToDelete) => {
    setTickets(tickets.filter((ticket) => ticket.id !== ticketToDelete.id));
  };

  useEffect(() => console.log(tickets), [tickets]);

  const onTicketValueChange = (id, value) => {
    let newticketValue = Object.assign({}, ticket, { [id]: value.value });
    setTicket(newticketValue);
  };

  const onPageChange = (pageType, action, ticketToBeEdited = DEFAULTVALUE) => {
    setTicket(ticketToBeEdited);
    setTicketAction(action);
    setPage(pageType);
  };

  const renderHeader = () => {
    return (
      <nav class="navbar navbar-dark bg-dark">
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => {
            onPageChange('TicketList');
          }}
        >
          Tickets
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          onClick={() => {
            onPageChange('TicketForm', 'AddTicket');
          }}
        >
          Add Ticket
        </button>
      </nav>
    );
  };

  const renderPages = () => {
    if (page === 'TicketForm') {
      return (
        <TicketForm
          ticket={ticket}
          ticketAction={ticketAction}
          onTicketValueChange={onTicketValueChange}
          onTicketCreate={onTicketCreate}
          handleTicketEdit={handleTicketEdit}
        />
      );
    } else if (page === 'TicketList') {
      return (
        <table class="table table-hover">
          <tr>
            <th>Id</th>
            <th>Subject</th>
            <th></th>
            <th></th>
            <th>Status</th>
            <th>Owner</th>
          </tr>
          {tickets.map((items) => {
            let { id, subject, owner, status } = items;
            return (
              <tr>
                <td>{id}</td>
                <td>{subject}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() =>
                      onPageChange('TicketForm', 'EditTicket', items)
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => handleDelete({ id })}
                  >
                    Delete
                  </button>
                </td>
                <td>{status}</td>
                <td>{owner}</td>
              </tr>
            );
          })}
        </table>
      );
    }
  };
  return (
    <div>
      {renderHeader()}
      {renderPages()}
    </div>
  );
}
