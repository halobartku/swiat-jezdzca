import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Calendar } from './ui/calendar';
import { Dropdown, DropdownItem } from './ui/dropdown';
import { Search, Filter, MapPin, Calendar as CalendarIcon, Globe } from 'lucide-react';
import { horseApi, Event } from '../services/horseApi';
import { motion } from 'framer-motion';

const CompetitionMap: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    scope: 'all' // 'national' or 'international'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await horseApi.getUpcomingEvents();
        setEvents(eventsData);
        if (eventsData.length > 0) {
          setSelectedEvent(eventsData[0]);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filters.type === 'all' || event.type === filters.type;
    const matchesScope = filters.scope === 'all' || 
                        (filters.scope === 'international' ? event.isInternational : !event.isInternational);
    
    return matchesSearch && matchesType && matchesScope;
  });

  const eventTypes = Array.from(new Set(events.map(event => event.type)));

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary-text">
            Kalendarz Wydarzeń
          </h1>
          <div className="flex gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Szukaj wydarzeń..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dropdown
              trigger={
                <span className="flex items-center gap-2 text-sm">
                  <Filter className="w-4 h-4" />
                  {filters.type === 'all' ? 'Wszystkie typy' : filters.type}
                </span>
              }
            >
              <DropdownItem
                onClick={() => setFilters(f => ({ ...f, type: 'all' }))}
                active={filters.type === 'all'}
              >
                Wszystkie typy
              </DropdownItem>
              {eventTypes.map(type => (
                <DropdownItem
                  key={type}
                  onClick={() => setFilters(f => ({ ...f, type }))}
                  active={filters.type === type}
                >
                  {type}
                </DropdownItem>
              ))}
            </Dropdown>
            <Dropdown
              trigger={
                <span className="flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4" />
                  {filters.scope === 'all' ? 'Wszystkie' : 
                   filters.scope === 'international' ? 'Międzynarodowe' : 'Krajowe'}
                </span>
              }
            >
              <DropdownItem
                onClick={() => setFilters(f => ({ ...f, scope: 'all' }))}
                active={filters.scope === 'all'}
              >
                Wszystkie
              </DropdownItem>
              <DropdownItem
                onClick={() => setFilters(f => ({ ...f, scope: 'international' }))}
                active={filters.scope === 'international'}
              >
                Międzynarodowe
              </DropdownItem>
              <DropdownItem
                onClick={() => setFilters(f => ({ ...f, scope: 'national' }))}
                active={filters.scope === 'national'}
              >
                Krajowe
              </DropdownItem>
            </Dropdown>
          </div>
        </div>

        {/* Calendar and Event Details */}
        <div className="flex gap-6">
          {/* Calendar */}
          <div className="w-[300px]">
            <Calendar
              events={filteredEvents}
              onEventClick={setSelectedEvent}
              className="bg-white rounded-lg shadow-sm border border-gray-100"
            />
          </div>

          {/* Event Details */}
          <div className="flex-1">
            {selectedEvent ? (
              <Card className="bg-white h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold mb-2">{selectedEvent.name}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <CalendarIcon className="w-4 h-4" />
                          <span>
                            {new Date(selectedEvent.date).toLocaleDateString('pl-PL', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedEvent.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedEvent.isInternational && (
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          Międzynarodowe
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedEvent.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                        selectedEvent.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedEvent.status === 'upcoming' ? 'Nadchodzące' :
                         selectedEvent.status === 'ongoing' ? 'W trakcie' : 'Zakończone'}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-3">
                  {selectedEvent.organizer && (
                    <p className="text-sm text-gray-600 mb-3">
                      Organizator: {selectedEvent.organizer}
                    </p>
                  )}
                  {selectedEvent.description && (
                    <p className="text-sm text-gray-600 mb-3">
                      {selectedEvent.description}
                    </p>
                  )}
                  {selectedEvent.prizePool && (
                    <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                      <p className="text-sm font-medium text-primary">
                        Pula nagród: {selectedEvent.prizePool}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                Wybierz wydarzenie z kalendarza
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompetitionMap;
