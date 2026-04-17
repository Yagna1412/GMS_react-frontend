// Logic hook for ApprovalCenter (superadmin)
import { useDashboard } from '../../../context/DashboardContext';
import { useState } from 'react';
import { initialApprovals } from '../data/approvals';

export function useApprovalCenter() {
  const { approvals, approveRequest, rejectRequest } = useDashboard();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showRejectModal, setShowRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const pendingApprovals = approvals.filter(a => a.status === 'Pending');

  const filteredRequests = pendingApprovals.filter(req => {
    const matchesPriority = filterPriority === 'all' || req.priority === filterPriority;
    const matchesType = filterType === 'all' || req.type === filterType;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = String(req.requester).toLowerCase().includes(searchLower) ||
      String(req.id).toLowerCase().includes(searchLower) ||
      String(req.branch).toLowerCase().includes(searchLower);
    return matchesPriority && matchesType && matchesSearch;
  });

  return {
    selectedRequest, setSelectedRequest,
    filterPriority, setFilterPriority,
    filterType, setFilterType,
    showRejectModal, setShowRejectModal,
    rejectReason, setRejectReason,
    searchTerm, setSearchTerm,
    filteredRequests,
    approveRequest, rejectRequest
  };
}