
import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { 
  setFilters, 
  setCurrentPage,
  setItemsPerPage,
  deleteJob,
  JobPost
} from '@/store/slices/jobsSlice';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { 
  Briefcase, 
  PlusCircle, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import JobPostForm from '@/components/jobs/JobPostForm';

const JobPostsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { jobs, filters, pagination } = useAppSelector(state => state.jobs);
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !filters.search || 
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.department.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.location.toLowerCase().includes(filters.search.toLowerCase());
      
    const matchesDepartment = !filters.department || job.department === filters.department;
    const matchesStatus = !filters.status || job.status === filters.status;
    const matchesType = !filters.type || job.type === filters.type;
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesType;
  });
  
  // Calculate pagination
  const totalFilteredJobs = filteredJobs.length;
  const totalPages = Math.ceil(totalFilteredJobs / pagination.itemsPerPage);
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);
  
  // Get unique values for filters
  const departments = Array.from(new Set(jobs.map(job => job.department)));
  const statuses = ['active', 'draft', 'closed'];
  const types = Array.from(new Set(jobs.map(job => job.type)));
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ search: e.target.value }));
  };
  
  // Handle filter changes
  const handleFilterChange = (name: string, value: string) => {
    dispatch(setFilters({ [name]: value }));
  };
  
  // Handle pagination
  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };
  
  // Handle row selection for editing
  const handleEditJob = (job: JobPost) => {
    setSelectedJob(job);
    setIsEditDialogOpen(true);
  };
  
  // Handle job deletion
  const handleDeleteJob = (job: JobPost) => {
    setSelectedJob(job);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDeleteJob = () => {
    if (selectedJob) {
      dispatch(deleteJob(selectedJob.id));
      toast({
        title: "Job deleted",
        description: `"${selectedJob.title}" has been deleted successfully.`,
      });
      setIsDeleteDialogOpen(false);
    }
  };
  
  const handleAddNewJob = () => {
    setSelectedJob(null);
    setIsAddDialogOpen(true);
  };
  
  // Job status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success">Active</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'closed':
        return <Badge variant="destructive">Closed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Postings</h1>
          <p className="text-muted-foreground">
            Manage and track all your company job postings.
          </p>
        </div>
        
        <Button onClick={handleAddNewJob} className="w-full md:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Job Post
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Job Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center relative">
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search jobs..."
                  value={filters.search}
                  onChange={handleSearch}
                  className="pl-9"
                />
              </div>
              
              <Select
                value={filters.department}
                onValueChange={(value) => handleFilterChange('department', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={filters.status}
                onValueChange={(value) => handleFilterChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={filters.type}
                onValueChange={(value) => handleFilterChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Jobs Table */}
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead className="hidden md:table-cell">Location</TableHead>
                  <TableHead className="hidden md:table-cell">Posted Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Applicants</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentJobs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No job posts found.
                    </TableCell>
                  </TableRow>
                ) : (
                  currentJobs.map(job => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div className="font-medium">{job.title}</div>
                        <div className="text-sm text-muted-foreground md:hidden">
                          {job.department} • {job.location}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {job.department}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {job.location}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(job.postedDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(job.status)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {job.applicants}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditJob(job)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteJob(job)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, totalFilteredJobs)} of {totalFilteredJobs} jobs
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={pagination.currentPage === 1}
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i}
                    variant={pagination.currentPage === i + 1 ? "default" : "outline"}
                    size="icon"
                    onClick={() => handlePageChange(i + 1)}
                    className="hidden md:flex"
                  >
                    {i + 1}
                  </Button>
                ))}
                
                <div className="md:hidden text-sm">
                  Page {pagination.currentPage} of {totalPages}
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  disabled={pagination.currentPage === totalPages}
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Add Job Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Job Post</DialogTitle>
            <DialogDescription>
              Create a new job posting for your company.
            </DialogDescription>
          </DialogHeader>
          <JobPostForm 
            onClose={() => setIsAddDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
      
      {/* Edit Job Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Job Post</DialogTitle>
            <DialogDescription>
              Update the details of this job posting.
            </DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <JobPostForm 
              job={selectedJob} 
              onClose={() => setIsEditDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedJob?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteJob}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobPostsPage;
