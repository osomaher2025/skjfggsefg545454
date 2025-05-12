
import React, { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addJob, updateJob, JobPost } from '@/store/slices/jobsSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

interface JobPostFormProps {
  job?: JobPost;
  onClose: () => void;
}

const JobPostForm: React.FC<JobPostFormProps> = ({ job, onClose }) => {
  const dispatch = useAppDispatch();
  const isEditing = !!job;
  
  const [formData, setFormData] = useState({
    id: job?.id || Math.random().toString(36).substring(2, 11),
    title: job?.title || '',
    department: job?.department || '',
    location: job?.location || '',
    type: job?.type || 'Full-time',
    status: job?.status || 'active' as 'active' | 'draft' | 'closed',
    description: job?.description || '',
    requirements: job?.requirements || '',
    postedDate: job?.postedDate || new Date().toISOString().split('T')[0],
    applicants: job?.applicants || 0,
  });
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      dispatch(updateJob(formData as JobPost));
      toast({
        title: "Job updated",
        description: `"${formData.title}" has been updated successfully.`,
      });
    } else {
      dispatch(addJob(formData as JobPost));
      toast({
        title: "Job created",
        description: `"${formData.title}" has been created successfully.`,
      });
    }
    
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Senior Software Engineer"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g. Engineering"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Remote or New York, NY"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Job Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => handleSelectChange('type', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Job Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          placeholder="Enter job description..."
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="requirements">Requirements</Label>
        <Textarea
          id="requirements"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          rows={3}
          placeholder="Enter job requirements..."
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => handleSelectChange('status', value as 'active' | 'draft' | 'closed')}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? 'Update Job Post' : 'Create Job Post'}
        </Button>
      </div>
    </form>
  );
};

export default JobPostForm;
