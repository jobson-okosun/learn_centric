import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface PageMaterialData {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  readTime: string;
  lastUpdated: string;
  moduleName: string;
  richTextContent: string;
  nextItem?: { title: string; type: string };
}

@Component({
  imports: [RouterLink],
  selector: 'app-learner-page-material',
  styleUrl: './page.css',
  templateUrl: './page.html',
})
export default class Page {
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);

  readonly isCompleted = signal(false);

  // Dictionary of rich text page notes
  private readonly pagesMap: Record<string, PageMaterialData> = {
    'page1-2': {
      id: 'page1-2',
      title: 'Reading Notes: Hyperplane Approximations & Differential Calculus',
      subtitle: 'Analytical foundation for linearizing multivariable surfaces and error bounds',
      author: 'Dr. Evelyn Reed',
      readTime: '12 mins read',
      lastUpdated: 'Jan 26, 2026',
      moduleName: 'Module 1: Foundations of Multivariable Functions',
      nextItem: { title: 'Multivariable Chain Rule Worked Problems', type: 'video' },
      richTextContent: `
        <p class="lead-text">
          In multivariable differential calculus, the tangent hyperplane represents the optimal first-order linear approximation to a scalar function <code>z = f(x, y)</code> in the immediate neighborhood of a base point <code>(x₀, y₀)</code>.
        </p>

        <h3>1. Analytical Definition of the Tangent Hyperplane</h3>
        <p>
          For a function of two variables <code>f: ℝ² → ℝ</code> continuously differentiable at a point <code>P₀(x₀, y₀)</code>, the equation of the tangent plane to the surface <code>z = f(x, y)</code> is defined by:
        </p>

        <div class="formula-card">
          <span class="formula-label">Tangent Hyperplane Equation</span>
          <div class="formula-math">
            L(x, y) = f(x₀, y₀) + f_x(x₀, y₀)(x - x₀) + f_y(x₀, y₀)(y - y₀)
          </div>
        </div>

        <p>
          Here, <code>f_x = ∂f/∂x</code> and <code>f_y = ∂f/∂y</code> denote the first-order partial derivatives evaluated at <code>(x₀, y₀)</code>. Geometrically, the coefficients correspond to the slopes of the tangent lines to the surface in the planes parallel to the coordinate axes.
        </p>

        <h3>2. The Total Differential & Error Approximation</h3>
        <p>
          Let <code>Δx = x - x₀</code> and <code>Δy = y - y₀</code> represent small increments in the independent variables. The total differential <code>dz</code> provides an estimate of the true increment <code>Δz = f(x₀ + Δx, y₀ + Δy) - f(x₀, y₀)</code>:
        </p>

        <div class="formula-card">
          <span class="formula-label">Total Differential</span>
          <div class="formula-math">
            dz = \frac{\partial f}{\partial x} dx + \frac{\partial f}{\partial y} dy
          </div>
        </div>

        <h4>Key Properties of Differential Linearization:</h4>
        <ul class="styled-list">
          <li><strong>Orthogonality:</strong> The normal vector <code>N = ⟨f_x, f_y, -1⟩</code> is perpendicular to every curve lying on the surface passing through <code>P₀</code>.</li>
          <li><strong>Differentiability Condition:</strong> A function is differentiable at <code>P₀</code> if the linearization error satisfies: 
            <code>lim_{(Δx, Δy) → (0, 0)} \frac{|f(x₀+Δx, y₀+Δy) - L(x₀+Δx, y₀+Δy)|}{\sqrt{Δx² + Δy²}} = 0</code>.
          </li>
          <li><strong>Continuity of Partials:</strong> If the partial derivatives <code>f_x</code> and <code>f_y</code> exist and are continuous near <code>(x₀, y₀)</code>, then <code>f</code> is guaranteed to be differentiable at that point.</li>
        </ul>

        <h3>3. Hessian Matrix & Second Derivative Test</h3>
        <p>
          To classify stationary points where the gradient vector vanishes (<code>∇f(x₀, y₀) = ⟨0, 0⟩</code>), we construct the Hessian matrix of second-order partial derivatives:
        </p>

        <div class="formula-card">
          <span class="formula-label">Hessian Determinant (Discriminant)</span>
          <div class="formula-math">
            D = f_{xx}(x₀, y₀) \cdot f_{yy}(x₀, y₀) - [f_{xy}(x₀, y₀)]²
          </div>
        </div>

        <ul class="styled-list">
          <li><strong>Local Minimum:</strong> If <code>D > 0</code> and <code>f_{xx}(x₀, y₀) > 0</code>, the surface curves upward in all directions.</li>
          <li><strong>Local Maximum:</strong> If <code>D > 0</code> and <code>f_{xx}(x₀, y₀) < 0</code>, the surface curves downward in all directions.</li>
          <li><strong>Saddle Point:</strong> If <code>D < 0</code>, the surface curves upward in one direction and downward in another.</li>
          <li><strong>Inconclusive Test:</strong> If <code>D = 0</code>, higher-order Taylor approximations or direct topological analysis is required.</li>
        </ul>
      `
    },
    'page2-1': {
      id: 'page2-1',
      title: 'Notes: Hyperplane Approximation Formulas & Error Bounds',
      subtitle: 'Rigorous quadratic error estimations via Taylor\'s Theorem with Lagrange remainder',
      author: 'Dr. Evelyn Reed',
      readTime: '10 mins read',
      lastUpdated: 'Feb 12, 2026',
      moduleName: 'Module 2: Directional Derivatives & The Gradient Vector',
      richTextContent: `
        <p class="lead-text">
          When approximating non-linear surfaces with tangent planes, understanding the magnitude and asymptotic behavior of the truncation error is essential for computational mathematics and engineering simulations.
        </p>

        <h3>Taylor's Theorem with Remainder in Two Dimensions</h3>
        <p>
          Suppose <code>f(x, y)</code> has continuous second partial derivatives on an open disk centered at <code>(x₀, y₀)</code>. Then:
        </p>

        <div class="formula-card">
          <span class="formula-label">Second-Order Remainder</span>
          <div class="formula-math">
            f(x, y) = L(x, y) + R₁(x, y)
          </div>
        </div>

        <p>
          Where the remainder term <code>R₁(x, y)</code> can be bounded by the maximum absolute values of the second-order partials across the path connecting <code>(x₀, y₀)</code> to <code>(x, y)</code>:
        </p>

        <div class="formula-card">
          <span class="formula-label">Error Bound Inequality</span>
          <div class="formula-math">
            |R₁(x, y)| \leq \frac{1}{2} M \left(|x - x₀| + |y - y₀|\right)²
          </div>
        </div>
      `
    },
    'page3-1': {
      id: 'page3-1',
      title: 'Reading Notes: Fubini\'s Theorem & Reversing Orders of Integration',
      subtitle: 'Techniques for setting up integration bounds across non-rectangular 2D regions',
      author: 'Dr. Evelyn Reed',
      readTime: '8 mins read',
      lastUpdated: 'Feb 25, 2026',
      moduleName: 'Module 3: Multiple Integrals & Vector Fields',
      richTextContent: `
        <p class="lead-text">
          Fubini's Theorem provides the fundamental bridge between double integrals over planar domains and iterated single-variable integrals.
        </p>

        <h3>Type I vs Type II Regions</h3>
        <p>
          A region <code>D</code> in the xy-plane is <strong>Type I</strong> if it lies between the graphs of two continuous functions of x:
        </p>
        <div class="formula-card">
          <span class="formula-label">Type I Iterated Bounds</span>
          <div class="formula-math">
            \iint_D f(x, y) \, dA = \int_a^b \int_{g₁(x)}^{g₂(x)} f(x, y) \, dy \, dx
          </div>
        </div>
      `
    },
    'page3-2': {
      id: 'page3-2',
      title: 'Reading Notes: Fundamental Theorem of Line Integrals & Path Independence',
      subtitle: 'Conservative vector fields, gradient potentials, and curl-free criteria',
      author: 'Dr. Evelyn Reed',
      readTime: '14 mins read',
      lastUpdated: 'Mar 02, 2026',
      moduleName: 'Module 3: Multiple Integrals & Vector Fields',
      richTextContent: `
        <p class="lead-text">
          A vector field <code>F</code> is termed conservative if there exists a scalar potential function <code>f</code> such that <code>F = ∇f</code>. In such fields, work done along any smooth curve depends solely on the endpoints.
        </p>

        <div class="formula-card">
          <span class="formula-label">Fundamental Theorem of Line Integrals</span>
          <div class="formula-math">
            \int_C \nabla f \cdot d\mathbf{r} = f(\mathbf{r}(b)) - f(\mathbf{r}(a))
          </div>
        </div>
      `
    }
  };

  readonly activePageId = computed(() => {
    return this.route.snapshot.paramMap.get('pageId') || 'page1-2';
  });

  readonly page = computed<PageMaterialData>(() => {
    const id = this.activePageId();
    return this.pagesMap[id] || this.pagesMap['page1-2'];
  });

  readonly sanitizedContent = computed<SafeHtml>(() => {
    return this.sanitizer.bypassSecurityTrustHtml(this.page().richTextContent);
  });

  toggleCompleted() {
    this.isCompleted.update(v => !v);
  }
}
