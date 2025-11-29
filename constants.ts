import { ColorPalette, GoogleFont } from './types';

export const DEFAULT_PALETTE: ColorPalette = {
  primary: '#0d6efd',
  secondary: '#6c757d',
  success: '#198754',
  info: '#0dcaf0',
  warning: '#ffc107',
  danger: '#dc3545',
  light: '#f8f9fa',
  dark: '#212529',
  bodyBg: '#ffffff',
  bodyColor: '#212529',
};

export const GOOGLE_FONTS: GoogleFont[] = [
  { name: 'System UI (Default)', family: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif' },
  { name: 'Roboto', family: '"Roboto", sans-serif' },
  { name: 'Open Sans', family: '"Open Sans", sans-serif' },
  { name: 'Lato', family: '"Lato", sans-serif' },
  { name: 'Montserrat', family: '"Montserrat", sans-serif' },
  { name: 'Poppins', family: '"Poppins", sans-serif' },
  { name: 'Merriweather', family: '"Merriweather", serif' },
  { name: 'Playfair Display', family: '"Playfair Display", serif' },
  { name: 'Space Mono', family: '"Space Mono", monospace' },
];

export const MOCK_DASHBOARD_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mock Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- FONTS_PLACEHOLDER -->
    <style>
      /* CSS_VAR_PLACEHOLDER */
      
      /* Additional helper for the chart mock */
      .chart-bar {
        height: 100%;
        width: 100%;
        background-color: var(--bs-gray-200);
        border-radius: 4px;
        position: relative;
        overflow: hidden;
      }
      .chart-fill {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: var(--bs-primary);
        transition: height 0.5s ease;
      }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div class="container-fluid">
            <a class="navbar-brand" href="javascript:void(0);"><i class="fas fa-chart-line me-2"></i>FinDash</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item"><a class="nav-link active" href="javascript:void(0);">Dashboard</a></li>
                    <li class="nav-item"><a class="nav-link" href="javascript:void(0);">Transactions</a></li>
                    <li class="nav-item"><a class="nav-link" href="javascript:void(0);">Reports</a></li>
                </ul>
                <span class="navbar-text text-white">
                    <i class="fas fa-user-circle me-1"></i> Admin User
                </span>
            </div>
        </div>
    </nav>

    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <div class="col-md-2 d-none d-md-block">
                <div class="list-group mb-3">
                    <a href="javascript:void(0);" class="list-group-item list-group-item-action active" aria-current="true">
                       <i class="fas fa-home me-2"></i> Overview
                    </a>
                    <a href="javascript:void(0);" class="list-group-item list-group-item-action"><i class="fas fa-wallet me-2"></i> Wallet</a>
                    <a href="javascript:void(0);" class="list-group-item list-group-item-action"><i class="fas fa-file-invoice-dollar me-2"></i> Invoices</a>
                    <a href="javascript:void(0);" class="list-group-item list-group-item-action"><i class="fas fa-users me-2"></i> Clients</a>
                    <a href="javascript:void(0);" class="list-group-item list-group-item-action"><i class="fas fa-cog me-2"></i> Settings</a>
                </div>
                
                <div class="card bg-light border-0">
                    <div class="card-body">
                        <h6 class="card-title text-muted">Subscription</h6>
                        <p class="card-text small">Pro Plan (Yearly)</p>
                        <div class="progress mb-2" style="height: 5px;">
                            <div class="progress-bar bg-success" role="progressbar" style="width: 75%"></div>
                        </div>
                        <small class="text-muted">25 days left</small>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="col-md-10">
                <!-- Stats Cards -->
                <div class="row g-3 mb-4">
                    <div class="col-12 col-sm-6 col-xl-3">
                        <div class="card shadow-sm border-0 h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h6 class="text-muted mb-0">Total Revenue</h6>
                                    <div class="icon-shape bg-primary bg-opacity-10 text-primary rounded-circle p-2">
                                        <i class="fas fa-dollar-sign"></i>
                                    </div>
                                </div>
                                <h3 class="fw-bold mb-1">$24,500</h3>
                                <small class="text-success"><i class="fas fa-arrow-up"></i> 12.5%</small> <small class="text-muted">vs last month</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-xl-3">
                        <div class="card shadow-sm border-0 h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h6 class="text-muted mb-0">Expenses</h6>
                                    <div class="icon-shape bg-danger bg-opacity-10 text-danger rounded-circle p-2">
                                        <i class="fas fa-credit-card"></i>
                                    </div>
                                </div>
                                <h3 class="fw-bold mb-1">$8,240</h3>
                                <small class="text-danger"><i class="fas fa-arrow-up"></i> 2.1%</small> <small class="text-muted">vs last month</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-xl-3">
                        <div class="card shadow-sm border-0 h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h6 class="text-muted mb-0">Net Profit</h6>
                                    <div class="icon-shape bg-success bg-opacity-10 text-success rounded-circle p-2">
                                        <i class="fas fa-coins"></i>
                                    </div>
                                </div>
                                <h3 class="fw-bold mb-1">$16,260</h3>
                                <small class="text-success"><i class="fas fa-arrow-up"></i> 18.2%</small> <small class="text-muted">vs last month</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-xl-3">
                        <div class="card shadow-sm border-0 h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h6 class="text-muted mb-0">Pending Tasks</h6>
                                    <div class="icon-shape bg-warning bg-opacity-10 text-warning rounded-circle p-2">
                                        <i class="fas fa-tasks"></i>
                                    </div>
                                </div>
                                <h3 class="fw-bold mb-1">12</h3>
                                <small class="text-muted">Requires attention</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-4">
                    <!-- Chart Section -->
                    <div class="col-lg-8">
                        <div class="card shadow-sm border-0 h-100">
                            <div class="card-header bg-transparent border-0 d-flex justify-content-between align-items-center py-3">
                                <h5 class="mb-0 fw-bold">Revenue Overview</h5>
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">This Year</button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="javascript:void(0);">This Year</a></li>
                                        <li><a class="dropdown-item" href="javascript:void(0);">Last Year</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="card-body">
                                <!-- Mock Chart using CSS -->
                                <div class="d-flex justify-content-around align-items-end h-100 pb-3" style="min-height: 300px;">
                                    <div class="d-flex flex-column align-items-center" style="height: 100%; width: 8%;">
                                        <div class="chart-bar"><div class="chart-fill" style="height: 45%;"></div></div>
                                        <small class="mt-2 text-muted">Jan</small>
                                    </div>
                                    <div class="d-flex flex-column align-items-center" style="height: 100%; width: 8%;">
                                        <div class="chart-bar"><div class="chart-fill" style="height: 55%;"></div></div>
                                        <small class="mt-2 text-muted">Feb</small>
                                    </div>
                                    <div class="d-flex flex-column align-items-center" style="height: 100%; width: 8%;">
                                        <div class="chart-bar"><div class="chart-fill bg-info" style="height: 70%;"></div></div>
                                        <small class="mt-2 text-muted">Mar</small>
                                    </div>
                                    <div class="d-flex flex-column align-items-center" style="height: 100%; width: 8%;">
                                        <div class="chart-bar"><div class="chart-fill" style="height: 60%;"></div></div>
                                        <small class="mt-2 text-muted">Apr</small>
                                    </div>
                                    <div class="d-flex flex-column align-items-center" style="height: 100%; width: 8%;">
                                        <div class="chart-bar"><div class="chart-fill" style="height: 85%;"></div></div>
                                        <small class="mt-2 text-muted">May</small>
                                    </div>
                                    <div class="d-flex flex-column align-items-center" style="height: 100%; width: 8%;">
                                        <div class="chart-bar"><div class="chart-fill" style="height: 50%;"></div></div>
                                        <small class="mt-2 text-muted">Jun</small>
                                    </div>
                                    <div class="d-flex flex-column align-items-center" style="height: 100%; width: 8%;">
                                        <div class="chart-bar"><div class="chart-fill bg-success" style="height: 90%;"></div></div>
                                        <small class="mt-2 text-muted">Jul</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Form Section -->
                     <div class="col-lg-4">
                        <div class="card shadow-sm border-0 h-100">
                             <div class="card-header bg-transparent border-0 py-3">
                                <h5 class="mb-0 fw-bold">Quick Transfer</h5>
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="mb-3">
                                        <label class="form-label text-muted">Recipient</label>
                                        <input type="text" class="form-control" placeholder="John Doe">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label text-muted">Amount</label>
                                        <div class="input-group">
                                            <span class="input-group-text">$</span>
                                            <input type="number" class="form-control" placeholder="0.00">
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label text-muted">Note</label>
                                        <textarea class="form-control" rows="2"></textarea>
                                    </div>
                                    <div class="d-grid">
                                        <button type="button" class="btn btn-primary">Send Money</button>
                                    </div>
                                </form>
                                <hr>
                                <div class="d-flex align-items-center justify-content-between">
                                    <span class="text-muted small">Daily Limit</span>
                                    <span class="fw-bold">$5,000</span>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>

                <!-- Table Section -->
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-header bg-transparent border-0 py-3">
                        <h5 class="mb-0 fw-bold">Recent Transactions</h5>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="bg-light">
                                <tr>
                                    <th scope="col" class="ps-4">ID</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col" class="text-end pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="ps-4">#TRX-9821</td>
                                    <td>Oct 24, 2023</td>
                                    <td><span class="fw-bold text-dark">Spotify Subscription</span><br><small class="text-muted">Entertainment</small></td>
                                    <td><span class="badge bg-success bg-opacity-10 text-success rounded-pill px-3">Completed</span></td>
                                    <td class="fw-bold">-$12.99</td>
                                    <td class="text-end pe-4"><button class="btn btn-sm btn-link text-muted"><i class="fas fa-ellipsis-v"></i></button></td>
                                </tr>
                                <tr>
                                    <td class="ps-4">#TRX-9822</td>
                                    <td>Oct 23, 2023</td>
                                    <td><span class="fw-bold text-dark">Client Payment - Acme Corp</span><br><small class="text-muted">Design Services</small></td>
                                    <td><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">Processing</span></td>
                                    <td class="fw-bold text-success">+$1,500.00</td>
                                    <td class="text-end pe-4"><button class="btn btn-sm btn-link text-muted"><i class="fas fa-ellipsis-v"></i></button></td>
                                </tr>
                                <tr>
                                    <td class="ps-4">#TRX-9823</td>
                                    <td>Oct 22, 2023</td>
                                    <td><span class="fw-bold text-dark">AWS Infrastructure</span><br><small class="text-muted">Hosting</small></td>
                                    <td><span class="badge bg-secondary bg-opacity-10 text-secondary rounded-pill px-3">Pending</span></td>
                                    <td class="fw-bold">-$84.50</td>
                                    <td class="text-end pe-4"><button class="btn btn-sm btn-link text-muted"><i class="fas fa-ellipsis-v"></i></button></td>
                                </tr>
                                <tr>
                                    <td class="ps-4">#TRX-9824</td>
                                    <td>Oct 21, 2023</td>
                                    <td><span class="fw-bold text-dark">Office Supplies</span><br><small class="text-muted">Operations</small></td>
                                    <td><span class="badge bg-warning bg-opacity-10 text-warning rounded-pill px-3">Review</span></td>
                                    <td class="fw-bold">-$250.00</td>
                                    <td class="text-end pe-4"><button class="btn btn-sm btn-link text-muted"><i class="fas fa-ellipsis-v"></i></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <footer class="text-center text-muted small py-3">
                    &copy; 2023 FinDash Inc. All rights reserved.
                </footer>
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
