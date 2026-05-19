import React, { useState } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiBriefcase, FiMoreHorizontal } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './ApplicationTracker.css';

interface Application {
  id: string;
  company: string;
  role: string;
  logo: string;
  status: string;
  date: string;
}

const initialApplications: Application[] = [
  { id: '1', company: 'TechNova', role: 'Frontend Developer', logo: '/default-avatar.png', status: 'saved', date: '2d ago' },
  { id: '2', company: 'GlobalSync', role: 'React Engineer', logo: '/default-avatar.png', status: 'applied', date: '1w ago' },
  { id: '3', company: 'InnoTech', role: 'UI/UX Designer', logo: '/default-avatar.png', status: 'interview', date: '3d ago' },
  { id: '4', company: 'DataCorp', role: 'Software Engineer', logo: '/default-avatar.png', status: 'offer', date: '1d ago' },
];

const COLUMNS = [
  { id: 'saved', title: 'Saved' },
  { id: 'applied', title: 'Applied' },
  { id: 'interview', title: 'Interviewing' },
  { id: 'offer', title: 'Offers' },
  { id: 'rejected', title: 'Rejected' }
];

const SortableItem = ({ app }: { app: Application }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: app.id, data: { status: app.status } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className={`kanban-card ${isDragging ? 'dragging' : ''}`}
    >
      <div className="kanban-card-header">
        <div className="company-info">
          <img src={app.logo} alt={app.company} />
          <div>
            <h4>{app.role}</h4>
            <p>{app.company}</p>
          </div>
        </div>
        <button className="btn-icon-small"><FiMoreHorizontal /></button>
      </div>
      <div className="kanban-card-footer">
        <span className="app-date">{app.date}</span>
      </div>
    </div>
  );
};

const DroppableColumn = ({ column, items }: { column: { id: string, title: string }, items: Application[] }) => {
  return (
    <div className="kanban-column">
      <div className="kanban-column-header">
        <h3>{column.title}</h3>
        <motion.span 
          key={items.length} 
          initial={{ scale: 1.5, color: 'var(--primary-color)' }}
          animate={{ scale: 1, color: 'var(--text-secondary)' }}
          className="column-badge"
        >
          {items.length}
        </motion.span>
      </div>
      <div className="kanban-column-body">
        <SortableContext 
          id={column.id}
          items={items.map(i => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map(app => (
            <SortableItem key={app.id} app={app} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

const ApplicationTracker: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const activeItem = applications.find(x => x.id === activeId);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.sortable;
    const isOverTask = over.data.current?.sortable;

    // Finding items
    const activeIndex = applications.findIndex(t => t.id === activeId);
    let overIndex = applications.findIndex(t => t.id === overId);

    // If dropping on a column
    if (!isOverTask) {
      setApplications((items) => {
        const newItems = [...items];
        newItems[activeIndex].status = overId;
        return arrayMove(newItems, activeIndex, newItems.length - 1);
      });
      return;
    }

    // Dropping on another task
    setApplications((items) => {
      const newItems = [...items];
      newItems[activeIndex].status = items[overIndex].status;
      return arrayMove(newItems, activeIndex, overIndex);
    });
  };

  const handleDragEnd = (event: any) => {
    setActiveId(null);
  };

  return (
    <div className="application-tracker">
      <div className="tracker-header">
        <h2>My Applications</h2>
        <p>Drag and drop to track your job application progress</p>
      </div>

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="kanban-board">
          {COLUMNS.map(col => (
            <DroppableColumn 
              key={col.id} 
              column={col} 
              items={applications.filter(a => a.status === col.id)} 
            />
          ))}
        </div>

        <DragOverlay>
          {activeItem ? (
            <div className="kanban-card dragging-overlay">
              <div className="kanban-card-header">
                <div className="company-info">
                  <img src={activeItem.logo} alt={activeItem.company} />
                  <div>
                    <h4>{activeItem.role}</h4>
                    <p>{activeItem.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default ApplicationTracker;
