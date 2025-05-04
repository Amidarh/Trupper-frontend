export const getStatusBadge = (status: string) => {
    const baseClass = "px-2 py-1 rounded text-sm font-medium";
    switch (status.toLowerCase()) {
        case "active":
            return <span className={`${baseClass} bg-green-100 text-green-800`}>Active</span>;
        case "inactive":
            return <span className={`${baseClass} bg-gray-100 text-red-500`}>Inactive</span>;
        case "pending":
            return <span className={`${baseClass} bg-yellow-100 text-yellow-800`}>Pending</span>;
        case "draft":
            return <span className={`${baseClass} bg-yellow-100 text-yellow-800`}>Draft</span>;
        case "used":
            return <span className={`${baseClass} bg-yellow-100 text-yellow-800`}>used</span>;
        case "sent":
            return <span className={`${baseClass} bg-green-100 text-green-800`}>Sent</span>;
        case "approved":
            return <span className={`${baseClass} bg-green-100 text-green-800`}>Approved</span>;
        case "blocked":
            return <span className={`${baseClass} bg-red-100 text-red-800`}>Blocked</span>;
        default:
            return <span className={`${baseClass} bg-red-100 text-red-800`}>Unknown</span>;
    }
};
