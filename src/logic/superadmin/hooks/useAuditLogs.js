// Logic hook for AuditLogs (superadmin)
import { useDashboard } from '../../../context/DashboardContext';
import { useState } from 'react';

export function useAuditLogs() {
  const { auditLogs } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterEntity, setFilterEntity] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState(null);

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    const matchesEntity = filterEntity === 'all' || log.entity === filterEntity;
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const logDate = new Date(log.timestamp);
      const now = new Date();
      const diffHours = (now - logDate) / (1000 * 60 * 60);
      if (dateFilter === '24h' && diffHours > 24) matchesDate = false;
      if (dateFilter === '7d' && diffHours > 168) matchesDate = false;
      if (dateFilter === '30d' && diffHours > 720) matchesDate = false;
    }
    return matchesSearch && matchesAction && matchesEntity && matchesDate;
  });

  return {
    searchTerm, setSearchTerm,
    filterAction, setFilterAction,
    filterEntity, setFilterEntity,
    dateFilter, setDateFilter,
    selectedLog, setSelectedLog,
    filteredLogs
  };
}