package sys

import (
	"context"
	"github.com/shirou/gopsutil/cpu"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"math"
	"time"
)

// Stats struct
type Stats struct {
	ctx context.Context
}

// CPUUsage .
type CPUUsage struct {
	Average int `json:"avg"`
}

// NewStats creates a new App application struct
func NewStats() *Stats {
	return &Stats{}
}

// OnStartup is called at application startup
func (a *Stats) OnStartup(ctx context.Context) {
	// Perform your setup here
	a.ctx = ctx
	go func() {
		for {
			runtime.EventsEmit(a.ctx, "cpu_usage", a.GetCPUUsage())
			time.Sleep(time.Millisecond * 100)
		}
	}()
}

// domReady is called after front-end resources have been loaded
func (a Stats) domReady(ctx context.Context) {
	// Add your action here
}

// beforeClose is called when the application is about to quit,
// either by clicking the window close button or calling runtime.Quit.
// Returning true will cause the application to continue, false will continue shutdown as normal.
func (a *Stats) beforeClose(ctx context.Context) (prevent bool) {
	return false
}

// shutdown is called at application termination
func (a *Stats) shutdown(ctx context.Context) {
	// Perform your teardown here
}

// GetCPUUsage .
func (a *Stats) GetCPUUsage() *CPUUsage {
	percent, err := cpu.Percent(1*time.Second, false)
	if err != nil {
		runtime.LogErrorf(a.ctx, "unable to get cpu stats: %s", err.Error())
		return nil
	}

	cpus := &CPUUsage{
		Average: int(math.Round(percent[0])),
	}
	runtime.LogInfof(a.ctx, "get cpu stats: %d", cpus.Average)

	return cpus
}
