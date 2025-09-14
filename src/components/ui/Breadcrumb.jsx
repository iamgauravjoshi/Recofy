import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  const routeMap = {
    '/main-dashboard': 'Dashboard',
    '/transaction-management': 'Transactions',
    '/financial-reports': 'Reports',
    '/stock-market-tracker': 'Market',
    '/ad-campaign-management': 'Advertising',
    '/account-settings': 'Settings',
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/main-dashboard' }];

    if (pathSegments?.length > 0) {
      const currentPath = `/${pathSegments?.join('/')}`;
      const currentLabel = routeMap?.[currentPath];
      
      if (currentLabel && currentPath !== '/main-dashboard') {
        breadcrumbs?.push({ label: currentLabel, path: currentPath });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {breadcrumbs?.map((crumb, index) => (
        <React.Fragment key={crumb?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          {index === breadcrumbs?.length - 1 ? (
            <span className="text-foreground font-medium">{crumb?.label}</span>
          ) : (
            <Link
              to={crumb?.path}
              className="hover:text-foreground transition-colors duration-200"
            >
              {crumb?.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;