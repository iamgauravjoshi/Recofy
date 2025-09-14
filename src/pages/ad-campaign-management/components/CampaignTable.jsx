import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CampaignTable = ({ campaigns, onEditCampaign, onViewAnalytics, onToggleStatus }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedCampaigns = [...campaigns]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue?.toLowerCase();
      bValue = bValue?.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN')?.format(num);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={14} className="text-gray-400" />;
    }
    return sortDirection === 'asc' ? 
      <Icon name="ArrowUp" size={14} className="text-primary" /> : 
      <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Campaign Name</span>
                  <SortIcon field="name" />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('budget')}
              >
                <div className="flex items-center space-x-1">
                  <span>Budget</span>
                  <SortIcon field="budget" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('impressions')}
              >
                <div className="flex items-center space-x-1">
                  <span>Impressions</span>
                  <SortIcon field="impressions" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('clicks')}
              >
                <div className="flex items-center space-x-1">
                  <span>Clicks</span>
                  <SortIcon field="clicks" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('ctr')}
              >
                <div className="flex items-center space-x-1">
                  <span>CTR</span>
                  <SortIcon field="ctr" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('spend')}
              >
                <div className="flex items-center space-x-1">
                  <span>Spend</span>
                  <SortIcon field="spend" />
                </div>
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {sortedCampaigns?.map((campaign) => (
              <tr key={campaign?.id} className="hover:bg-muted/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon name="Megaphone" size={20} className="text-primary" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-foreground">{campaign?.name}</div>
                      <div className="text-sm text-muted-foreground">{campaign?.type}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign?.status)}`}>
                    {campaign?.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {formatCurrency(campaign?.budget)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {formatNumber(campaign?.impressions)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {formatNumber(campaign?.clicks)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {campaign?.ctr}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {formatCurrency(campaign?.spend)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewAnalytics(campaign)}
                    >
                      <Icon name="BarChart3" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditCampaign(campaign)}
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleStatus(campaign)}
                    >
                      <Icon name={campaign?.status === 'active' ? 'Pause' : 'Play'} size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden">
        {sortedCampaigns?.map((campaign) => (
          <div key={campaign?.id} className="p-4 border-b border-border last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                  <Icon name="Megaphone" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">{campaign?.name}</h3>
                  <p className="text-xs text-muted-foreground">{campaign?.type}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign?.status)}`}>
                {campaign?.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-muted-foreground">Budget</p>
                <p className="text-sm font-medium text-foreground">{formatCurrency(campaign?.budget)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Spend</p>
                <p className="text-sm font-medium text-foreground">{formatCurrency(campaign?.spend)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Impressions</p>
                <p className="text-sm font-medium text-foreground">{formatNumber(campaign?.impressions)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">CTR</p>
                <p className="text-sm font-medium text-foreground">{campaign?.ctr}%</p>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewAnalytics(campaign)}
              >
                <Icon name="BarChart3" size={16} />
                <span className="ml-1">Analytics</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditCampaign(campaign)}
              >
                <Icon name="Edit" size={16} />
                <span className="ml-1">Edit</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignTable;