import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import "../assets/scss/_03-Componentes/_POrgTareasBoda.scss";

function POrgTareasBoda() {
  // ------------------------------------------------------------
  // ESTADOS DEL COMPONENTE (CORREGIDO: AÑADIDO groupByStatus)
  // ------------------------------------------------------------
  const [tasksData, setTasksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [assignedFilter, setAssignedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [groupByStatus, setGroupByStatus] = useState(false); // Estado añadido
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    category: 'salon',
    dueDate: '',
    assigned: 'both'
  });

  // ------------------------------------------------------------
  // EFECTOS (se mantienen igual)
  // ------------------------------------------------------------
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/POrgTareasBoda1.json');
        if (!response.ok) throw new Error('Error al cargar las tareas');
        const data = await response.json();
        
        const cleanedData = data.categories.map(category => ({
          ...category,
          id: category.id.replace(/\s+/g, ''),
          name: category.name.replace(/\n/g, ' ').trim(),
          tasks: category.tasks.map(task => ({
            ...task,
            name: task.name.replace(/\n/g, ' ').trim()
          }))
        }));
        
        setTasksData(cleanedData);
        
        const savedTareasboda = localStorage.getItem('weddingTareasboda');
        if (savedTareasboda) {
          setTasksData(JSON.parse(savedTareasboda));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (tasksData.length > 0) {
      localStorage.setItem('weddingTareasboda', JSON.stringify(tasksData));
    }
  }, [tasksData]);

  // ------------------------------------------------------------
  // MANEJADORES Y FUNCIONES (se mantienen igual)
  // ------------------------------------------------------------
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setTasksData((prevTasks) => {
        const oldIndex = prevTasks.findIndex(cat => cat.tasks.some(t => t.id === active.id));
        const newIndex = prevTasks.findIndex(cat => cat.tasks.some(t => t.id === over.id));
        
        if (oldIndex === newIndex) {
          const category = prevTasks[oldIndex];
          const oldTaskIndex = category.tasks.findIndex(t => t.id === active.id);
          const newTaskIndex = category.tasks.findIndex(t => t.id === over.id);
          
          const updatedCategory = {
            ...category,
            tasks: arrayMove(category.tasks, oldTaskIndex, newTaskIndex)
          };
          
          return prevTasks.map((cat, idx) => 
            idx === oldIndex ? updatedCategory : cat
          );
        }
        return prevTasks;
      });
    }
    setActiveId(null);
  };

  const toggleTask = (categoryId, taskId) => {
    const wasCompleted = tasksData
      .find(c => c.id === categoryId)
      ?.tasks.find(t => t.id === taskId)?.completed;
    
    setTasksData(prevTasks =>
      prevTasks.map(category =>
        category.id === categoryId
          ? {
              ...category,
              tasks: category.tasks.map(task =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              )
            }
          : category
      )
    );
    
    const taskElement = document.getElementById(`tarea-${taskId}`);
    if (taskElement) {
      taskElement.classList.add(wasCompleted ? 'uncompleted-feedback' : 'completed-feedback');
      setTimeout(() => {
        taskElement.classList.remove(wasCompleted ? 'uncompleted-feedback' : 'completed-feedback');
      }, 1000);
    }
  };

  const assignTask = (categoryId, taskId, assignee) => {
    setTasksData(prevTasks =>
      prevTasks.map(category =>
        category.id === categoryId
          ? {
              ...category,
              tasks: category.tasks.map(task =>
                task.id === taskId
                  ? { ...task, assigned: assignee }
                  : task
              )
            }
          : category
      )
    );
  };

  const addNewTask = () => {
    if (!newTask.name.trim()) return;
    
    const newTaskObj = {
      id: `custom-${Date.now()}`,
      name: newTask.name.trim(),
      assigned: newTask.assigned,
      dueDate: newTask.dueDate || 'Sin fecha',
      completed: false
    };

    setTasksData(prevTasks => 
      prevTasks.map(category => 
        category.id === newTask.category
          ? { ...category, tasks: [...category.tasks, newTaskObj] }
          : category
      )
    );

    setNewTask({
      name: '',
      category: 'salon',
      dueDate: '',
      assigned: 'both'
    });
    setShowAddTask(false);
  };

  const daysUntilDue = (dueDate) => {
    if (!dueDate || dueDate === 'Sin fecha') return null;
    const today = new Date();
    const due = new Date(dueDate);
    return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  };

  const getCategoryIcon = (categoryId) => {
    switch(categoryId) {
      case 'salon': return 'bi-building';
      case 'vestuario': return 'bi-suit-heart';
      case 'menu': return 'bi-egg-fried';
      case 'invitaciones': return 'bi-envelope';
      case 'entretenimiento': return 'bi-music-note-beamed';
      case 'fotografia': return 'bi-camera';
      case 'regalos': return 'bi-gift';
      case 'web': return 'bi-globe';
      case 'ceremonia': return 'bi-heart';
      case 'transporte': return 'bi-truck';
      default: return 'bi-list-check';
    }
  };

  // ------------------------------------------------------------
  // CÁLCULOS DERIVADOS (CORREGIDO: usando el estado groupByStatus)
  // ------------------------------------------------------------
  const filteredCategories = tasksData.map(category => ({
    ...category,
    tasks: category.tasks.filter(task => {
      if (filter === 'completed' && !task.completed) return false;
      if (filter === 'pending' && task.completed) return false;
      if (assignedFilter !== 'all' && task.assigned !== assignedFilter) return false;
      if (searchTerm && !task.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
  })).filter(category => category.tasks.length > 0);

  const groupedCategories = groupByStatus 
    ? [
        {
          id: 'pending',
          name: 'Pendientes',
          tasks: filteredCategories.flatMap(c => c.tasks.filter(t => !t.completed))
        },
        {
          id: 'completed',
          name: 'Completadas',
          tasks: filteredCategories.flatMap(c => c.tasks.filter(t => t.completed))
        }
      ].filter(g => g.tasks.length > 0)
    : filteredCategories;

  const totalTasks = tasksData.flatMap(category => category.tasks).length;
  const completedTasks = tasksData.flatMap(category => category.tasks).filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // ------------------------------------------------------------
  // RENDERIZADO (añadido control para groupByStatus)
  // ------------------------------------------------------------
  if (loading) {
    return (
      <div className="pantalla-tareasboda">
        <div className="loading-message">
          <i className="bi bi-hourglass-split"></i> Cargando lista de tareas...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pantalla-tareasboda">
        <div className="error-message">
          <i className="bi bi-exclamation-triangle-fill"></i> Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="pantalla-tareasboda">
      <div className="contenedor-tareasboda">
        <div className="controles-superiores">
          <div className="encabezado-boda">
            <h1>Lista de Tareas de la Boda</h1>
          </div>
          
          <button 
            className="btn-agregar"
            onClick={() => setShowAddTask(!showAddTask)}
          >
            <i className={`bi ${showAddTask ? 'bi-x-lg' : 'bi-plus-lg'}`}></i>
            {showAddTask ? 'Cancelar' : 'Agregar Tarea'}
          </button>
        </div>

        {showAddTask && (
          <div className="formulario-tarea">
            <div className="grupo-formulario">
              <label>Tarea:</label>
              <input
                type="text"
                value={newTask.name}
                onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                placeholder="Descripción de la tarea"
              />
            </div>
            
            <div className="grupo-formulario">
              <label>Categoría:</label>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({...newTask, category: e.target.value})}
              >
                {tasksData.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grupo-formulario">
              <label>Fecha límite:</label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              />
            </div>
            
            <div className="grupo-formulario">
              <label>Asignar a:</label>
              <select
                value={newTask.assigned}
                onChange={(e) => setNewTask({...newTask, assigned: e.target.value})}
              >
                <option value="both">Ambos</option>
                <option value="alejandro">Alejandro</option>
                <option value="fabiola">Fabiola</option>
              </select>
            </div>
            
            <button 
              className="btn-guardar"
              onClick={addNewTask}
              disabled={!newTask.name.trim()}
            >
              Guardar Tarea
            </button>
          </div>
        )}

        <div className="controles-filtrado">
          <div className="search-box">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Buscar tareas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filtros">
            <div className="filtro-chips">
              {['all', 'completed', 'pending'].map((f) => (
                <button
                  key={f}
                  className={`chip ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f === 'all' && 'Todas'}
                  {f === 'completed' && 'Completadas'}
                  {f === 'pending' && 'Pendientes'}
                </button>
              ))}
            </div>

            <select value={assignedFilter} onChange={(e) => setAssignedFilter(e.target.value)}>
              <option value="all">Todos los responsables</option>
              <option value="both">Ambos</option>
              <option value="alejandro">Alejandro</option>
              <option value="fabiola">Fabiola</option>
            </select>

            {/* Control para agrupación por estado */}
            <div className="agrupacion">
              <label>
                <input 
                  type="checkbox" 
                  checked={groupByStatus} 
                  onChange={(e) => setGroupByStatus(e.target.checked)} 
                />
                Agrupar por estado
              </label>
            </div>
          </div>
        </div>

        <div className="resumen-estadisticas">
          <div className="estadistica">
            <span className="numero">{totalTasks}</span>
            <span className="etiqueta">Total</span>
            <div className="barra-progreso">
              <div 
                className="progreso" 
                style={{ width: `${(completedTasks/totalTasks)*100}%` }}
              ></div>
            </div>
          </div>
          <div className="estadistica">
            <span className="numero">{completedTasks}</span>
            <span className="etiqueta">Completadas</span>
          </div>
          <div className="estadistica">
            <span className="numero">{pendingTasks}</span>
            <span className="etiqueta">Pendientes</span>
          </div>
        </div>

        <div className="lista-tareas">
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {groupedCategories.length > 0 ? (
              groupedCategories.map((category) => (
                <motion.div
                  key={category.id}
                  className="categoria"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <div className="encabezado-categoria">
                    <i className={`bi ${getCategoryIcon(category.id)}`}></i>
                    <h3>{category.name}</h3>
                    <span className="contador-tareas">
                      {category.tasks.length} tareas
                    </span>
                  </div>

                  <SortableContext 
                    items={category.tasks.map(task => task.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <ul className="tareas">
                      {category.tasks.map((task) => (
                        <SortableItem 
                          key={task.id} 
                          id={task.id}
                          task={task}
                          toggleTask={toggleTask}
                          assignTask={assignTask}
                          categoryId={category.id}
                          daysUntilDue={daysUntilDue}
                        />
                      ))}
                    </ul>
                  </SortableContext>
                </motion.div>
              ))
            ) : (
              <div className="sin-resultados">
                <i className="bi bi-inbox"></i>
                <h3>No hay tareas que coincidan</h3>
                <p>Intenta ajustar tus filtros de búsqueda</p>
                <button 
                  className="btn-limpiar" 
                  onClick={() => {
                    setFilter('all');
                    setAssignedFilter('all');
                    setSearchTerm('');
                  }}
                >
                  Limpiar filtros
                </button>
              </div>
            )}
            <DragOverlay>
              {activeId ? (
                <div className="tarea-arrastrando">
                  {tasksData.flatMap(cat => cat.tasks).find(t => t.id === activeId)?.name}
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}

function SortableItem({ id, task, toggleTask, assignTask, categoryId, daysUntilDue }) {
  return (
    <motion.li
      id={`tarea-${id}`}
      className={`tarea ${task.completed ? 'completada' : ''} asignada-${task.assigned}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 200 }
      }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="mango-arrastre">
        <i className="bi bi-grip-vertical"></i>
      </div>
      
      <input
        type="checkbox"
        id={`tarea-${id}`}
        checked={task.completed}
        onChange={() => toggleTask(categoryId, id)}
      />
      
      <label htmlFor={`tarea-${id}`}>
        <span className="nombre-tarea">{task.name}</span>
        <span className="fecha-vencimiento">
          {task.dueDate}
          {daysUntilDue(task.dueDate) <= 7 && (
            <span className="urgente">¡Urgente!</span>
          )}
        </span>
      </label>
      
      <div className="asignacion-tarea">
        <select
          value={task.assigned}
          onChange={(e) => assignTask(categoryId, id, e.target.value)}
          onClick={(e) => e.stopPropagation()}
        >
          <option value="both">Ambos</option>
          <option value="alejandro">Alejandro</option>
          <option value="fabiola">Fabiola</option>
        </select>
      </div>
    </motion.li>
  );
}

export default POrgTareasBoda;