import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Trash2, Plus, CalendarDays } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { TimeSlot } from "@shared/schema";

export default function Admin() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newSlot, setNewSlot] = useState({
    time: "10:00",
    durationMinutes: 60,
    priceEur: 5000,
    capacity: 1,
    notes: ""
  });

  const { data: slots = [], isLoading } = useQuery<TimeSlot[]>({
    queryKey: ["/api/time-slots"]
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/time-slots", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/time-slots"] });
      toast({ title: "Time slot created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create time slot", variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/time-slots/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/time-slots"] });
      toast({ title: "Time slot deleted" });
    },
    onError: () => {
      toast({ title: "Failed to delete time slot", variant: "destructive" });
    }
  });

  const handleAddSlot = () => {
    if (!selectedDate) return;
    
    const [hours, minutes] = newSlot.time.split(":").map(Number);
    const startAt = new Date(selectedDate);
    startAt.setHours(hours, minutes, 0, 0);

    createMutation.mutate({
      startAt: startAt.toISOString(),
      durationMinutes: newSlot.durationMinutes,
      priceEur: newSlot.priceEur,
      capacity: newSlot.capacity,
      notes: newSlot.notes || null,
      status: "available"
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const upcomingSlots = slots
    .filter(s => new Date(s.startAt) >= new Date())
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

  return (
    <div className="w-full bg-background min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-6xl">
        <h1 className="font-serif text-3xl md:text-4xl mb-8">Manage Booking Slots</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-xl flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add New Time Slot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="mb-2 block">Select Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newSlot.time}
                    onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
                    data-testid="input-slot-time"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (min)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newSlot.durationMinutes}
                    onChange={(e) => setNewSlot({ ...newSlot, durationMinutes: parseInt(e.target.value) })}
                    data-testid="input-slot-duration"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (cents)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newSlot.priceEur}
                    onChange={(e) => setNewSlot({ ...newSlot, priceEur: parseInt(e.target.value) })}
                    data-testid="input-slot-price"
                  />
                  <p className="text-xs text-muted-foreground">
                    Current: {(newSlot.priceEur / 100).toFixed(2)}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    value={newSlot.capacity}
                    onChange={(e) => setNewSlot({ ...newSlot, capacity: parseInt(e.target.value) })}
                    data-testid="input-slot-capacity"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Input
                  id="notes"
                  value={newSlot.notes}
                  onChange={(e) => setNewSlot({ ...newSlot, notes: e.target.value })}
                  placeholder="e.g., Wedding prep session"
                  data-testid="input-slot-notes"
                />
              </div>

              <Button 
                className="w-full" 
                onClick={handleAddSlot}
                disabled={!selectedDate || createMutation.isPending}
                data-testid="button-add-slot"
              >
                {createMutation.isPending ? "Adding..." : "Add Time Slot"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-xl flex items-center gap-2">
                <CalendarDays className="w-5 h-5" />
                Upcoming Slots ({upcomingSlots.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : upcomingSlots.length === 0 ? (
                <p className="text-muted-foreground">No upcoming slots. Add one using the form.</p>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {upcomingSlots.map((slot) => (
                    <div 
                      key={slot.id} 
                      className="flex items-center justify-between p-4 rounded-md bg-muted/50"
                      data-testid={`slot-item-${slot.id}`}
                    >
                      <div>
                        <p className="font-medium">{formatDate(slot.startAt)}</p>
                        <p className="text-sm text-muted-foreground">
                          {slot.durationMinutes} min | {(slot.priceEur / 100).toFixed(2)} | 
                          {slot.bookedCount}/{slot.capacity} booked
                        </p>
                        {slot.notes && (
                          <p className="text-xs text-muted-foreground mt-1">{slot.notes}</p>
                        )}
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteMutation.mutate(slot.id)}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-delete-slot-${slot.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
