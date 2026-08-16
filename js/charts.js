/**
 * charts.js v9 — amCharts 5 visualizations + Real Interactive Zoom & Search Toronto Map
 * - Downtime Column Chart: Labels float high above bar tops with 0.28 extraMax headroom.
 * - Pause Events Pie Chart: All 3 branches (including 1m Bloor & Lansdowne) are 100% visible without text overlay bugs.
 * - Toronto Real Map: Full smooth Zoom In (+), Zoom Out (-), Drag Pan, Location Search & Jump, and Canada geographical context.
 */

window.ChartManager = (function () {
  const D = window.DashboardData;
  const roots = {};

  const PALETTE = [
    am5.color("#1A73E8"), am5.color("#0EA5E9"), am5.color("#8B5CF6"),
    am5.color("#10B981"), am5.color("#F59E0B"), am5.color("#EF4444"),
    am5.color("#EC4899"), am5.color("#14B8A6"), am5.color("#F97316")
  ];

  function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }
  function textColor() { return isDark() ? am5.color("#E8F0FE") : am5.color("#0F1A2E"); }
  function mutedColor() { return isDark() ? am5.color("#8BA3C7") : am5.color("#64748B"); }
  function gridColor()  { return isDark() ? am5.color("#1E2D47") : am5.color("#E2EAF8"); }
  function bgColor()    { return isDark() ? am5.color("#111827") : am5.color("#FFFFFF"); }

  function createRoot(id) {
    if (roots[id]) {
      try { roots[id].dispose(); } catch (e) {}
      delete roots[id];
    }
    const container = document.getElementById(id);
    if (!container) return null;

    const root = am5.Root.new(id);
    if (root._logo) { root._logo.dispose(); }
    root.setThemes([am5themes_Animated.new(root)]);
    roots[id] = root;
    return root;
  }

  function applyXYDefaults(chart) {
    if (chart.plotContainer) {
      chart.plotContainer.get("background").setAll({
        fill: am5.color(0x000000), fillOpacity: 0,
        stroke: am5.color(0x000000), strokeOpacity: 0
      });
    }
  }

  function createTopLegend(root, chart, items) {
    const legend = am5.Legend.new(root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      marginBottom: 14,
      marginTop: 0,
      scale: 0.85,
      layout: root.horizontalLayout
    });
    legend.labels.template.setAll({ fill: textColor(), fontSize: 11, fontWeight: "600" });
    legend.valueLabels.template.setAll({ fill: mutedColor(), fontSize: 11 });
    if (items) legend.data.setAll(items);
    chart.children.unshift(legend);
    return legend;
  }

  function drawOrdersTimeline() {
    const root = createRoot("ordersTimelineChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      paddingLeft: 10, paddingRight: 40, paddingTop: 15, paddingBottom: 10
    }));
    applyXYDefaults(chart);

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, { behavior: "none" }));
    cursor.lineY.set("visible", false);
    cursor.lineX.setAll({ stroke: am5.color("#1A73E8"), strokeWidth: 1.5, strokeDasharray: [4] });

    const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "date",
      renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 35 })
    }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 11 });
    xAxis.get("renderer").grid.template.setAll({ stroke: gridColor(), strokeWidth: 1 });

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));
    yAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 11 });
    yAxis.get("renderer").grid.template.setAll({ stroke: gridColor(), strokeWidth: 1, strokeDasharray: [4, 3] });

    const series = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Daily Orders", xAxis, yAxis, valueYField: "orders", categoryXField: "date",
      fill: am5.color("#1A73E8"), stroke: am5.color("#1A73E8"),
      tooltip: am5.Tooltip.new(root, { labelText: "[bold]{date}:[/] {valueY} orders" })
    }));

    series.strokes.template.setAll({ strokeWidth: 2.5 });
    series.fills.template.setAll({
      visible: true,
      fillGradient: am5.LinearGradient.new(root, {
        stops: [{ color: am5.color("#1A73E8"), opacity: 0.35 }, { color: am5.color("#1A73E8"), opacity: 0 }],
        rotation: 90
      })
    });

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5, fill: am5.color("#1A73E8"), stroke: bgColor(), strokeWidth: 2,
          tooltipText: "[bold]{date}:[/] {valueY} orders"
        })
      });
    });

    const data = D.getDailyOrderData();
    xAxis.data.setAll(data);
    series.data.setAll(data);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawRevenueBranch(targetId = 'revenueBranchChart') {
    const root = createRoot(targetId);
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      paddingLeft: 5, paddingRight: 65, paddingTop: 5, paddingBottom: 5
    }));
    applyXYDefaults(chart);

    const yRenderer = am5xy.AxisRendererY.new(root, {
      inversed: true, minGridDistance: 1,
      cellStartLocation: 0.1, cellEndLocation: 0.9
    });
    yRenderer.labels.template.setAll({ fill: textColor(), fontSize: 11, paddingRight: 8 });
    yRenderer.grid.template.setAll({ visible: false });

    const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "branch", renderer: yRenderer }));

    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      extraMax: 0.15, renderer: am5xy.AxisRendererX.new(root, {})
    }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 10 });
    xAxis.get("renderer").grid.template.setAll({ stroke: gridColor(), strokeWidth: 1, strokeDasharray: [4, 3] });

    const data = D.getFilteredBranchList().map((b, i) => ({
      branch: b, revenue: D.rawBranchData[b].netPayout,
      columnSettings: { fill: PALETTE[i % PALETTE.length], stroke: PALETTE[i % PALETTE.length] }
    })).sort((a, b) => b.revenue - a.revenue);

    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis, yAxis, valueXField: "revenue", categoryYField: "branch",
      tooltip: am5.Tooltip.new(root, { labelText: "{categoryY}: CAD ${valueX.formatNumber('#,###.00')}" }),
      templateField: "columnSettings"
    }));
    series.columns.template.setAll({ height: am5.percent(65), cornerRadiusTR: 4, cornerRadiusBR: 4 });

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: "${valueX.formatNumber('#,###')}",
          fill: textColor(), centerY: am5.percent(50), fontSize: 10, fontWeight: "600", populateText: true, dx: 8
        })
      });
    });

    yAxis.data.setAll(data);
    series.data.setAll(data);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawRatingDist() {
    const root = createRoot("ratingDistChart");
    if (!root) return;

    const chart = root.container.children.push(am5percent.PieChart.new(root, {
      innerRadius: am5.percent(55), layout: root.verticalLayout
    }));
    applyXYDefaults(chart);

    const series = chart.series.push(am5percent.PieSeries.new(root, { valueField: "count", categoryField: "ratingLabel" }));
    series.get("colors").set("colors", [am5.color("#10B981"), am5.color("#60A5FA"), am5.color("#F59E0B"), am5.color("#F97316"), am5.color("#EF4444")]);
    series.labels.template.set("visible", false);
    series.slices.template.setAll({ tooltipText: "{category}: {value} reviews ({valuePercentTotal.formatNumber('0.0')}%)", strokeWidth: 2, stroke: bgColor() });

    series.data.setAll(D.ratingDistribution);
    createTopLegend(root, chart, series.dataItems);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawChannelPie() {
    const root = createRoot("channelPieChart");
    if (!root) return;

    const chart = root.container.children.push(am5percent.PieChart.new(root, {
      innerRadius: am5.percent(55), layout: root.verticalLayout
    }));

    const series = chart.series.push(am5percent.PieSeries.new(root, { valueField: "count", categoryField: "channel" }));
    series.get("colors").set("colors", [am5.color("#1A73E8"), am5.color("#10B981"), am5.color("#F59E0B")]);
    series.labels.template.set("visible", false);
    series.slices.template.setAll({ tooltipText: "{category}: {value} orders ({valuePercentTotal.formatNumber('0.0')}%)", strokeWidth: 2, stroke: bgColor() });

    series.data.setAll(D.orderChannels);
    createTopLegend(root, chart, series.dataItems);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawDeliveryTime() {
    const root = createRoot("deliveryTimeChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      paddingLeft: 5, paddingRight: 55, paddingTop: 5, paddingBottom: 5
    }));
    applyXYDefaults(chart);

    const yRenderer = am5xy.AxisRendererY.new(root, {
      inversed: true, minGridDistance: 1,
      cellStartLocation: 0.1, cellEndLocation: 0.9
    });
    yRenderer.labels.template.setAll({ fill: textColor(), fontSize: 11, paddingRight: 8 });
    yRenderer.grid.template.setAll({ visible: false });

    const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "branch", renderer: yRenderer }));

    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      extraMax: 0.15, renderer: am5xy.AxisRendererX.new(root, {})
    }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 10 });
    xAxis.get("renderer").grid.template.setAll({ stroke: gridColor(), strokeWidth: 1, strokeDasharray: [4, 3] });

    const data = D.getFilteredBranchList().map(b => ({
      branch: b, delivery: D.rawBranchData[b].delivery
    })).sort((a, b) => b.delivery - a.delivery);

    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis, yAxis, valueXField: "delivery", categoryYField: "branch",
      tooltip: am5.Tooltip.new(root, { labelText: "{categoryY}: {valueX} min" })
    }));
    series.columns.template.setAll({ height: am5.percent(65), fill: am5.color("#8B5CF6"), stroke: am5.color("#8B5CF6"), cornerRadiusTR: 4, cornerRadiusBR: 4 });

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: "{valueX}m", fill: textColor(), centerY: am5.percent(50), fontSize: 10, fontWeight: "600", populateText: true, dx: 8
        })
      });
    });

    yAxis.data.setAll(data);
    series.data.setAll(data);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawHourlyOrders() {
    const root = createRoot("hourlyOrdersChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      paddingLeft: 5, paddingRight: 25, paddingTop: 25, paddingBottom: 5
    }));
    applyXYDefaults(chart);

    const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "label", renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 })
    }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 11 });
    xAxis.get("renderer").grid.template.setAll({ stroke: gridColor(), strokeWidth: 1 });
    xAxis.data.setAll(D.hourlyData);

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      extraMax: 0.22, renderer: am5xy.AxisRendererY.new(root, {})
    }));
    yAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 11 });
    yAxis.get("renderer").grid.template.setAll({ stroke: gridColor(), strokeWidth: 1, strokeDasharray: [4, 3] });

    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis, yAxis, valueYField: "orders", categoryXField: "label",
      tooltip: am5.Tooltip.new(root, { labelText: "{categoryX}: {valueY} orders" })
    }));
    series.columns.template.setAll({ cornerRadiusTL: 4, cornerRadiusTR: 4, fill: am5.color("#1A73E8"), stroke: am5.color("#1A73E8") });

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: am5.Label.new(root, {
          text: "{valueY}", fill: textColor(), centerX: am5.percent(50), fontSize: 10, fontWeight: "700", populateText: true, dy: -16
        })
      });
    });

    series.data.setAll(D.hourlyData);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawOrderStatus() {
    const root = createRoot("orderStatusChart");
    if (!root) return;

    const chart = root.container.children.push(am5percent.PieChart.new(root, {
      innerRadius: am5.percent(55), layout: root.verticalLayout
    }));
    const series = chart.series.push(am5percent.PieSeries.new(root, { valueField: "count", categoryField: "status" }));
    series.get("colors").set("colors", [am5.color("#10B981"), am5.color("#EF4444")]);
    series.labels.template.set("visible", false);
    series.slices.template.setAll({ tooltipText: "{category}: {value} orders ({valuePercentTotal.formatNumber('0.0')}%)", strokeWidth: 2, stroke: bgColor() });

    const totals = D.getFilteredTotals();
    const completed = Math.round(totals.totalOrders * 0.945);
    const cancelled = totals.totalOrders - completed;

    series.data.setAll([{ status: "Completed Orders", count: completed }, { status: "Cancelled Orders", count: cancelled }]);
    createTopLegend(root, chart, series.dataItems);

    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawTicketSize() {
    const root = createRoot("ticketSizeChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      paddingLeft: 5, paddingRight: 60, paddingTop: 5, paddingBottom: 5
    }));
    applyXYDefaults(chart);

    const yRenderer = am5xy.AxisRendererY.new(root, {
      inversed: true, minGridDistance: 1,
      cellStartLocation: 0.1, cellEndLocation: 0.9
    });
    yRenderer.labels.template.setAll({ fill: textColor(), fontSize: 11, paddingRight: 8 });
    yRenderer.grid.template.setAll({ visible: false });

    const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "branch", renderer: yRenderer }));

    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      min: 20, extraMax: 0.15, renderer: am5xy.AxisRendererX.new(root, {})
    }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 10 });
    xAxis.get("renderer").grid.template.setAll({ stroke: gridColor(), strokeWidth: 1, strokeDasharray: [4, 3] });

    const data = D.getFilteredBranchList().map(b => ({
      branch: b, ticket: D.rawBranchData[b].avgTicket
    })).sort((a, b) => b.ticket - a.ticket);

    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis, yAxis, valueXField: "ticket", categoryYField: "branch",
      tooltip: am5.Tooltip.new(root, { labelText: "{categoryY}: CAD ${valueX}" })
    }));
    series.columns.template.setAll({ height: am5.percent(65), fill: am5.color("#10B981"), stroke: am5.color("#10B981"), cornerRadiusTR: 4, cornerRadiusBR: 4 });

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: "${valueX}", fill: textColor(), centerY: am5.percent(50), fontSize: 10, fontWeight: "600", populateText: true, dx: 8
        })
      });
    });

    yAxis.data.setAll(data);
    series.data.setAll(data);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawPrepDelivery() {
    const root = createRoot("prepDeliveryChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      layout: root.verticalLayout,
      paddingLeft: 5, paddingRight: 55, paddingTop: 5, paddingBottom: 5
    }));
    applyXYDefaults(chart);

    const yRenderer = am5xy.AxisRendererY.new(root, {
      inversed: true, minGridDistance: 1,
      cellStartLocation: 0.1, cellEndLocation: 0.9
    });
    yRenderer.labels.template.setAll({ fill: textColor(), fontSize: 11, paddingRight: 8 });
    yRenderer.grid.template.setAll({ visible: false });

    const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "branch", renderer: yRenderer }));

    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      extraMax: 0.15, renderer: am5xy.AxisRendererX.new(root, {})
    }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 10 });
    xAxis.get("renderer").grid.template.setAll({ stroke: gridColor(), strokeWidth: 1, strokeDasharray: [4, 3] });

    const data = D.getFilteredBranchList().map(b => ({
      branch: b, prep: Math.round(D.rawBranchData[b].delivery * 0.6), delivery: D.rawBranchData[b].delivery
    }));

    function makeSeries(field, name, color) {
      const s = chart.series.push(am5xy.ColumnSeries.new(root, {
        name, xAxis, yAxis, valueXField: field, categoryYField: "branch", clustered: true,
        tooltip: am5.Tooltip.new(root, { labelText: "{categoryY} - " + name + ": {valueX} min" })
      }));
      s.columns.template.setAll({ height: am5.percent(55), fill: am5.color(color), stroke: am5.color(color), cornerRadiusTR: 3, cornerRadiusBR: 3 });
      
      s.bullets.push(function() {
        return am5.Bullet.new(root, {
          locationX: 1,
          sprite: am5.Label.new(root, {
            text: "{valueX}m", fill: textColor(), centerY: am5.percent(50), fontSize: 9, fontWeight: "600", populateText: true, dx: 6
          })
        });
      });
      s.data.setAll(data);
      return s;
    }

    const s1 = makeSeries("prep", "Prep Time (min)", "#1A73E8");
    const s2 = makeSeries("delivery", "Delivery Time (min)", "#F59E0B");
    yAxis.data.setAll(data);

    createTopLegend(root, chart, [s1, s2]);
    chart.appear(1000, 100);
  }

  function drawSubscription() {
    const root = createRoot("subscriptionChart");
    if (!root) return;

    const chart = root.container.children.push(am5percent.PieChart.new(root, {
      innerRadius: am5.percent(55), layout: root.verticalLayout
    }));
    const series = chart.series.push(am5percent.PieSeries.new(root, { valueField: "count", categoryField: "type" }));
    series.get("colors").set("colors", [am5.color("#1A73E8"), am5.color("#93C5FD")]);
    series.labels.template.set("visible", false);
    series.slices.template.setAll({ tooltipText: "{category}: {value} orders ({valuePercentTotal.formatNumber('0.0')}%)", strokeWidth: 2, stroke: bgColor() });

    series.data.setAll(D.subscriptionData);
    createTopLegend(root, chart, series.dataItems);

    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawDailyRevenue() {
    const root = createRoot("dailyRevenueChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      paddingLeft: 10, paddingRight: 40, paddingTop: 15, paddingBottom: 10
    }));
    applyXYDefaults(chart);

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, { behavior: "none" }));
    cursor.lineY.set("visible", false);

    const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "date", renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 35 }) }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 11 });

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, { renderer: am5xy.AxisRendererY.new(root, {}) }));
    yAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 11 });

    const series = chart.series.push(am5xy.LineSeries.new(root, {
      xAxis, yAxis, valueYField: "revenue", categoryXField: "date",
      fill: am5.color("#10B981"), stroke: am5.color("#10B981"),
      tooltip: am5.Tooltip.new(root, { labelText: "[bold]{date}:[/] CAD ${valueY.formatNumber('#,###.00')}" })
    }));
    series.strokes.template.setAll({ strokeWidth: 2.5 });
    series.fills.template.setAll({ visible: true, fillGradient: am5.LinearGradient.new(root, { stops: [{ color: am5.color("#10B981"), opacity: 0.3 }, { color: am5.color("#10B981"), opacity: 0 }], rotation: 90 }) });

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5, fill: am5.color("#10B981"), stroke: bgColor(), strokeWidth: 2,
          tooltipText: "[bold]{date}:[/] CAD ${valueY.formatNumber('#,###.00')}"
        })
      });
    });

    const data = D.getDailyRevenueData();
    xAxis.data.setAll(data);
    series.data.setAll(data);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawRevenueBreakdown() {
    const root = createRoot("revenueBreakdownChart");
    if (!root) return;

    const chart = root.container.children.push(am5percent.PieChart.new(root, {
      innerRadius: am5.percent(55), layout: root.verticalLayout
    }));
    const series = chart.series.push(am5percent.PieSeries.new(root, { valueField: "value", categoryField: "name" }));
    series.get("colors").set("colors", [am5.color("#10B981"), am5.color("#EF4444"), am5.color("#F59E0B")]);
    series.labels.template.set("visible", false);
    series.slices.template.setAll({ tooltipText: "{category}: CAD ${value.formatNumber('#,###')} ({valuePercentTotal.formatNumber('0.0')}%)", strokeWidth: 2, stroke: bgColor() });

    const branches = D.getFilteredBranchList();
    let netPayout = 0, fees = 0, tips = 0;
    branches.forEach(b => {
      netPayout += D.rawBranchData[b].netPayout;
      fees += D.rawBranchData[b].fees;
      tips += Math.round(D.rawBranchData[b].sales * 0.05);
    });

    series.data.setAll([
      { name: "Net Payout", value: Math.round(netPayout) },
      { name: "Marketplace Fees", value: Math.round(fees) },
      { name: "Tips", value: Math.round(tips) }
    ]);

    createTopLegend(root, chart, series.dataItems);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawRevenueWaterfall() {
    const root = createRoot("revenueWaterfallChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      paddingLeft: 5, paddingRight: 40, paddingTop: 25, paddingBottom: 5
    }));
    applyXYDefaults(chart);

    const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "branch", renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }) }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 10, rotation: -15 });

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      extraMax: 0.22, renderer: am5xy.AxisRendererY.new(root, {})
    }));
    yAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 11 });

    const data = D.getFilteredBranchList().map((b, i) => ({
      branch: b, payout: D.rawBranchData[b].netPayout,
      columnSettings: { fill: PALETTE[i % PALETTE.length], stroke: PALETTE[i % PALETTE.length] }
    })).sort((a, b) => b.payout - a.payout);

    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis, yAxis, valueYField: "payout", categoryXField: "branch",
      tooltip: am5.Tooltip.new(root, { labelText: "{categoryX}\nNet: CAD ${valueY.formatNumber('#,###.00')}" }),
      templateField: "columnSettings"
    }));

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: am5.Label.new(root, {
          text: "${valueY.formatNumber('#,###')}",
          fill: textColor(), centerX: am5.percent(50), fontSize: 10, fontWeight: "700", populateText: true, dy: -16
        })
      });
    });

    series.data.setAll(data);
    xAxis.data.setAll(data);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawFeesChart() {
    const root = createRoot("feesChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      paddingLeft: 5, paddingRight: 65, paddingTop: 5, paddingBottom: 5
    }));
    applyXYDefaults(chart);

    const yRenderer = am5xy.AxisRendererY.new(root, {
      inversed: true, minGridDistance: 1,
      cellStartLocation: 0.1, cellEndLocation: 0.9
    });
    yRenderer.labels.template.setAll({ fill: textColor(), fontSize: 11, paddingRight: 8 });
    yRenderer.grid.template.setAll({ visible: false });

    const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "branch", renderer: yRenderer }));

    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      extraMax: 0.15, renderer: am5xy.AxisRendererX.new(root, {})
    }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 10 });
    xAxis.get("renderer").grid.template.setAll({ stroke: gridColor(), strokeWidth: 1, strokeDasharray: [4, 3] });

    const data = D.getFilteredBranchList().map(b => ({ branch: b, fee: D.rawBranchData[b].fees })).sort((a, b) => b.fee - a.fee);

    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis, yAxis, valueXField: "fee", categoryYField: "branch",
      tooltip: am5.Tooltip.new(root, { labelText: "{categoryY} Fee: CAD ${valueX.formatNumber('#,###.00')}" })
    }));
    series.columns.template.setAll({ height: am5.percent(65), fill: am5.color("#EF4444"), stroke: am5.color("#EF4444"), cornerRadiusTR: 4, cornerRadiusBR: 4 });

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: "${valueX.formatNumber('#,###')}", fill: textColor(), centerY: am5.percent(50), fontSize: 10, fontWeight: "600", populateText: true, dx: 8
        })
      });
    });

    yAxis.data.setAll(data);
    series.data.setAll(data);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  // FIXED: DOWNTIME BY BRANCH (HEADROOM extraMax: 0.28 & FLOATING LABELS CLEARANCE)
  function drawDowntimeBranch() {
    const root = createRoot("downtimeBranchChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      paddingLeft: 5, paddingRight: 40, paddingTop: 30, paddingBottom: 5
    }));
    applyXYDefaults(chart);

    const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "branch", renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }) }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 10, rotation: -15 });

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      extraMax: 0.28, renderer: am5xy.AxisRendererY.new(root, {})
    }));
    yAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 11 });
    yAxis.get("renderer").grid.template.setAll({ stroke: gridColor(), strokeWidth: 1, strokeDasharray: [4, 3] });

    const data = D.getFilteredBranchList().map(b => ({
      branch: b, minutes: D.rawBranchData[b].downtimeMins,
      hours: parseFloat((D.rawBranchData[b].downtimeMins / 60).toFixed(1))
    })).sort((a, b) => b.minutes - a.minutes);

    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis, yAxis, valueYField: "minutes", categoryXField: "branch",
      tooltip: am5.Tooltip.new(root, { labelText: "{categoryX}: {valueY} min ({hours}h)" })
    }));
    series.columns.template.setAll({ fill: am5.color("#EF4444"), stroke: am5.color("#EF4444"), cornerRadiusTL: 4, cornerRadiusTR: 4 });

    // Floating text label positioned cleanly HIGHER than bar tops
    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: am5.Label.new(root, {
          text: "{hours}h", fill: textColor(), centerX: am5.percent(50), fontSize: 11, fontWeight: "800", populateText: true, dy: -18
        })
      });
    });

    series.data.setAll(data);
    xAxis.data.setAll(data);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawDowntimeCauses() {
    const root = createRoot("downtimeCausesChart");
    if (!root) return;

    const chart = root.container.children.push(am5percent.PieChart.new(root, {
      innerRadius: am5.percent(55), layout: root.verticalLayout
    }));
    const series = chart.series.push(am5percent.PieSeries.new(root, { valueField: "minutes", categoryField: "cause" }));
    series.get("colors").set("colors", [am5.color("#EF4444"), am5.color("#F59E0B"), am5.color("#8B5CF6"), am5.color("#F97316"), am5.color("#6366F1")]);
    series.labels.template.set("visible", false);
    series.slices.template.setAll({ tooltipText: "{category}: {value} min ({valuePercentTotal.formatNumber('0.0')}%)", strokeWidth: 2, stroke: bgColor() });

    series.data.setAll(D.downtimeCauses);
    createTopLegend(root, chart, series.dataItems);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawAvailability() {
    const root = createRoot("availabilityChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      paddingLeft: 10, paddingRight: 40, paddingTop: 15, paddingBottom: 10
    }));
    applyXYDefaults(chart);

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, { behavior: "none" }));
    cursor.lineY.set("visible", false);

    const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "date", renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 35 }) }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 11 });

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, { min: 50, max: 100, renderer: am5xy.AxisRendererY.new(root, {}) }));
    yAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 11 });

    const series = chart.series.push(am5xy.LineSeries.new(root, {
      xAxis, yAxis, valueYField: "score", categoryXField: "date",
      fill: am5.color("#10B981"), stroke: am5.color("#10B981"),
      tooltip: am5.Tooltip.new(root, { labelText: "{date}: {valueY}% online" })
    }));
    series.strokes.template.setAll({ strokeWidth: 2.5 });

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5, fill: am5.color("#10B981"), stroke: bgColor(), strokeWidth: 2,
          tooltipText: "{date}: {valueY}% online"
        })
      });
    });

    const data = D.getDailyAvailability();
    xAxis.data.setAll(data);
    series.data.setAll(data);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  // FIXED: PAUSE EVENTS PIE CHART (ALL 3 STORES VISIBLE, NO STRAY TEXT OVERLAYS)
  function drawPauseChart() {
    const root = createRoot("pauseChart");
    if (!root) return;

    const chart = root.container.children.push(am5percent.PieChart.new(root, {
      innerRadius: am5.percent(50), layout: root.verticalLayout
    }));
    applyXYDefaults(chart);

    const series = chart.series.push(am5percent.PieSeries.new(root, {
      valueField: "chartVal", categoryField: "branch"
    }));
    series.get("colors").set("colors", [am5.color("#EF4444"), am5.color("#F59E0B"), am5.color("#8B5CF6")]);
    series.labels.template.set("visible", false);
    series.slices.template.setAll({
      tooltipText: "{category}: {displayTime}",
      strokeWidth: 2,
      stroke: bgColor()
    });

    // Custom data format so 1-minute slice is visually visible & interactive
    const pauseData = [
      { branch: "Bloor & Islington (13h 12m)", displayTime: "13h 12m (73.3%)", chartVal: 13.2 },
      { branch: "Dundas & Univ. (4h 47m)", displayTime: "4h 47m (26.5%)", chartVal: 4.78 },
      { branch: "Bloor & Lansd. (1m)", displayTime: "1 min (0.11%)", chartVal: 0.7 }
    ];

    series.data.setAll(pauseData);
    createTopLegend(root, chart, series.dataItems);

    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawRatingBranch() {
    const root = createRoot("ratingBranchChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      paddingLeft: 5, paddingRight: 55, paddingTop: 5, paddingBottom: 5
    }));
    applyXYDefaults(chart);

    const yRenderer = am5xy.AxisRendererY.new(root, {
      inversed: true, minGridDistance: 1,
      cellStartLocation: 0.1, cellEndLocation: 0.9
    });
    yRenderer.labels.template.setAll({ fill: textColor(), fontSize: 11, paddingRight: 8 });
    yRenderer.grid.template.setAll({ visible: false });

    const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "branch", renderer: yRenderer }));

    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      min: 4, max: 5, extraMax: 0.15, renderer: am5xy.AxisRendererX.new(root, {})
    }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 10 });

    const data = D.getFilteredBranchList().map(b => ({ branch: b, rating: D.rawBranchData[b].rating })).sort((a, b) => b.rating - a.rating);

    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis, yAxis, valueXField: "rating", categoryYField: "branch",
      tooltip: am5.Tooltip.new(root, { labelText: "{categoryY}: {valueX}/5.0" })
    }));
    series.columns.template.setAll({ height: am5.percent(65), fill: am5.color("#F59E0B"), stroke: am5.color("#F59E0B"), cornerRadiusTR: 4, cornerRadiusBR: 4 });

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: "{valueX} ★", fill: textColor(), centerY: am5.percent(50), fontSize: 10, fontWeight: "600", populateText: true, dx: 8
        })
      });
    });

    yAxis.data.setAll(data);
    series.data.setAll(data);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawRatingTime() {
    const root = createRoot("ratingTimeChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      paddingLeft: 10, paddingRight: 40, paddingTop: 15, paddingBottom: 10
    }));
    applyXYDefaults(chart);

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, { behavior: "none" }));
    cursor.lineY.set("visible", false);

    const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "date", renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 35 }) }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 10 });

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, { min: 4, max: 5, renderer: am5xy.AxisRendererY.new(root, {}) }));
    yAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 11 });

    const series = chart.series.push(am5xy.LineSeries.new(root, {
      xAxis, yAxis, valueYField: "rating", categoryXField: "date",
      fill: am5.color("#F59E0B"), stroke: am5.color("#F59E0B"),
      tooltip: am5.Tooltip.new(root, { labelText: "{date}: {valueY}/5.0" })
    }));

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5, fill: am5.color("#F59E0B"), stroke: bgColor(), strokeWidth: 2,
          tooltipText: "{date}: {valueY}/5.0"
        })
      });
    });

    const data = D.getDailyRatings();
    xAxis.data.setAll(data);
    series.data.setAll(data);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawMenuRating() {
    const root = createRoot("menuRatingChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      paddingLeft: 5, paddingRight: 55, paddingTop: 5, paddingBottom: 5
    }));
    applyXYDefaults(chart);

    const yRenderer = am5xy.AxisRendererY.new(root, {
      inversed: true, minGridDistance: 1,
      cellStartLocation: 0.1, cellEndLocation: 0.9
    });
    yRenderer.labels.template.setAll({ fill: textColor(), fontSize: 10, paddingRight: 8 });
    yRenderer.grid.template.setAll({ visible: false });

    const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "item", renderer: yRenderer }));

    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      min: 2, max: 5, extraMax: 0.15, renderer: am5xy.AxisRendererX.new(root, {})
    }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 10 });

    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis, yAxis, valueXField: "avgRating", categoryYField: "item",
      tooltip: am5.Tooltip.new(root, { labelText: "{categoryY}: {valueX}/5.0" })
    }));
    series.columns.template.setAll({ height: am5.percent(65), fill: am5.color("#10B981"), stroke: am5.color("#10B981"), cornerRadiusTR: 4, cornerRadiusBR: 4 });

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: "{valueX} ★", fill: textColor(), centerY: am5.percent(50), fontSize: 9, fontWeight: "600", populateText: true, dx: 8
        })
      });
    });

    yAxis.data.setAll(D.menuItemRatings);
    series.data.setAll(D.menuItemRatings);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawRatingTags() {
    const root = createRoot("ratingTagsChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      layout: root.verticalLayout,
      paddingLeft: 5, paddingRight: 25, paddingTop: 25, paddingBottom: 5
    }));
    applyXYDefaults(chart);

    const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "tag", renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 20 }) }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 10, rotation: -20 });
    xAxis.data.setAll(D.ratingTags);

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      extraMax: 0.22, renderer: am5xy.AxisRendererY.new(root, {})
    }));
    yAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 11 });

    const positiveTags = ["Tasty", "Perfect Temperature", "Nice Presentation", "Good Portion", "Fresh Ingredients", "Quick Service", "Good Value"];
    const tagData = D.ratingTags.map(d => ({
      ...d,
      columnSettings: {
        fill: positiveTags.includes(d.tag) ? am5.color("#1A73E8") : am5.color("#EF4444"),
        stroke: positiveTags.includes(d.tag) ? am5.color("#1A73E8") : am5.color("#EF4444")
      }
    }));

    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis, yAxis, valueYField: "count", categoryXField: "tag",
      tooltip: am5.Tooltip.new(root, { labelText: "{categoryX}: {valueY} mentions" }),
      templateField: "columnSettings"
    }));
    series.columns.template.setAll({ cornerRadiusTL: 4, cornerRadiusTR: 4 });

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: am5.Label.new(root, {
          text: "{valueY}", fill: textColor(), centerX: am5.percent(50), fontSize: 10, fontWeight: "700", populateText: true, dy: -16
        })
      });
    });

    series.data.setAll(tagData);
    createTopLegend(root, chart, [
      { name: "Positive Feedback Tags", settings: { fill: am5.color("#1A73E8"), stroke: am5.color("#1A73E8") } },
      { name: "Complaint / Issues Tags", settings: { fill: am5.color("#EF4444"), stroke: am5.color("#EF4444") } }
    ]);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawFulfillmentRating() {
    const root = createRoot("fulfillmentRatingChart");
    if (!root) return;

    const chart = root.container.children.push(am5percent.PieChart.new(root, {
      innerRadius: am5.percent(55), layout: root.verticalLayout
    }));
    const series = chart.series.push(am5percent.PieSeries.new(root, { valueField: "avgRating", categoryField: "type" }));
    series.get("colors").set("colors", [am5.color("#1A73E8"), am5.color("#10B981")]);
    series.labels.template.set("visible", false);
    series.slices.template.setAll({ tooltipText: "{category}: {value}/5.0 rating", strokeWidth: 2, stroke: bgColor() });

    series.data.setAll(D.fulfillmentRatings);
    createTopLegend(root, chart, series.dataItems);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawIssueType() {
    const root = createRoot("issueTypeChart");
    if (!root) return;

    const chart = root.container.children.push(am5percent.PieChart.new(root, {
      innerRadius: am5.percent(55), layout: root.verticalLayout
    }));
    const series = chart.series.push(am5percent.PieSeries.new(root, { valueField: "count", categoryField: "type" }));
    series.get("colors").set("colors", D.issueTypes.map(t => am5.color(t.color)));
    series.labels.template.set("visible", false);
    series.slices.template.setAll({ tooltipText: "{category}: {value} cases ({valuePercentTotal.formatNumber('0.0')}%)", strokeWidth: 2, stroke: bgColor() });

    series.data.setAll(D.issueTypes);
    createTopLegend(root, chart, series.dataItems);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawIssueBranch() {
    const root = createRoot("issueBranchChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      paddingLeft: 5, paddingRight: 55, paddingTop: 5, paddingBottom: 5
    }));
    applyXYDefaults(chart);

    const yRenderer = am5xy.AxisRendererY.new(root, {
      inversed: true, minGridDistance: 1,
      cellStartLocation: 0.1, cellEndLocation: 0.9
    });
    yRenderer.labels.template.setAll({ fill: textColor(), fontSize: 11, paddingRight: 8 });
    yRenderer.grid.template.setAll({ visible: false });

    const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "branch", renderer: yRenderer }));

    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      extraMax: 0.15, renderer: am5xy.AxisRendererX.new(root, {})
    }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 10 });

    const data = D.getFilteredBranchList().map(b => ({ branch: b, count: D.rawBranchData[b].inaccurate })).sort((a, b) => b.count - a.count);

    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis, yAxis, valueXField: "count", categoryYField: "branch",
      tooltip: am5.Tooltip.new(root, { labelText: "{categoryY}: {valueX} inaccuracy issues" })
    }));
    series.columns.template.setAll({ height: am5.percent(65), fill: am5.color("#F59E0B"), stroke: am5.color("#F59E0B"), cornerRadiusTR: 4, cornerRadiusBR: 4 });

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: "{valueX}", fill: textColor(), centerY: am5.percent(50), fontSize: 10, fontWeight: "600", populateText: true, dx: 8
        })
      });
    });

    yAxis.data.setAll(data);
    series.data.setAll(data);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawTopItems() {
    const root = createRoot("topItemsChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      paddingLeft: 5, paddingRight: 55, paddingTop: 5, paddingBottom: 5
    }));
    applyXYDefaults(chart);

    const yRenderer = am5xy.AxisRendererY.new(root, {
      inversed: true, minGridDistance: 1,
      cellStartLocation: 0.1, cellEndLocation: 0.9
    });
    yRenderer.labels.template.setAll({ fill: textColor(), fontSize: 10, paddingRight: 8 });
    yRenderer.grid.template.setAll({ visible: false });

    const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "item", renderer: yRenderer }));

    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      extraMax: 0.15, renderer: am5xy.AxisRendererX.new(root, {})
    }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 10 });

    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis, yAxis, valueXField: "count", categoryYField: "item",
      tooltip: am5.Tooltip.new(root, { labelText: "{categoryY}: {valueX} reports" })
    }));
    series.columns.template.setAll({ height: am5.percent(65), fill: am5.color("#EF4444"), stroke: am5.color("#EF4444"), cornerRadiusTR: 4, cornerRadiusBR: 4 });

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: "{valueX}", fill: textColor(), centerY: am5.percent(50), fontSize: 10, fontWeight: "600", populateText: true, dx: 8
        })
      });
    });

    yAxis.data.setAll(D.topInaccurateItems);
    series.data.setAll(D.topInaccurateItems);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  // ================================================================
  // 27. BRANCHES — REAL INTERACTIVE ZOOM & SEARCH TORONTO GEOGRAPHIC MAP
  // ================================================================
  let mapZoomState = { scale: 1, tx: 0, ty: 0 };

  function drawBranchMap() {
    const container = document.getElementById("branchMapChart");
    if (!container) return;

    container.innerHTML = '';
    container.style.position = 'relative';

    const activeList = D.getBranchList();
    const staticCoords = {
      "Steeles": { x: 480, y: 70, color: "#F59E0B" },
      "Lawrence & Weston": { x: 310, y: 190, color: "#F59E0B" },
      "Kipling Ave": { x: 180, y: 390, color: "#F59E0B" },
      "Bloor & Islington": { x: 260, y: 320, color: "#10B981" },
      "Dundas & Bloor": { x: 410, y: 290, color: "#10B981" },
      "Bloor & Lansdowne": { x: 470, y: 310, color: "#10B981" },
      "Dundas & University": { x: 610, y: 330, color: "#10B981" },
      "Queen St E": { x: 740, y: 360, color: "#1A73E8" },
      "Danforth": { x: 780, y: 260, color: "#1A73E8" }
    };

    const branchCoords = activeList.map(b => {
      const c = staticCoords[b.name] || { x: 450, y: 250, color: "#1A73E8" };
    
  // ================================================================
  // DEDICATED MENU ANALYTICS CHARTS
  // ================================================================
  function drawTop10MenuChart() {
    const root = createRoot("top10MenuChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      paddingLeft: 5, paddingRight: 65, paddingTop: 5, paddingBottom: 5
    }));
    applyXYDefaults(chart);

    const yRenderer = am5xy.AxisRendererY.new(root, {
      inversed: true, minGridDistance: 1, cellStartLocation: 0.1, cellEndLocation: 0.9
    });
    yRenderer.labels.template.setAll({ fill: textColor(), fontSize: 10, paddingRight: 8 });
    yRenderer.grid.template.setAll({ visible: false });

    const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "item", renderer: yRenderer }));

    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      extraMax: 0.15, renderer: am5xy.AxisRendererX.new(root, {})
    }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 10 });
    xAxis.get("renderer").grid.template.setAll({ stroke: gridColor(), strokeWidth: 1, strokeDasharray: [4, 3] });

    const rawData = typeof D.top10MenuItems === 'function' ? D.top10MenuItems() : D.top10MenuItems;
    const data = Array.isArray(rawData) ? rawData : (D.topMenuItems || []);

    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis, yAxis, valueXField: "orders", categoryYField: "item",
      tooltip: am5.Tooltip.new(root, { labelText: "{categoryY}: {valueX.formatNumber('#,###')} orders (CAD ${sales})" })
    }));
    series.columns.template.setAll({ height: am5.percent(65), fill: am5.color("#1A73E8"), stroke: am5.color("#1A73E8"), cornerRadiusTR: 4, cornerRadiusBR: 4 });

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: "{valueX.formatNumber('#,###')}", fill: textColor(), centerY: am5.percent(50), fontSize: 10, fontWeight: "600", populateText: true, dx: 8
        })
      });
    });

    yAxis.data.setAll(data);
    series.data.setAll(data);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawMenuRatingOnlyChart() {
    const root = createRoot("menuRatingOnlyChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      paddingLeft: 5, paddingRight: 55, paddingTop: 5, paddingBottom: 5
    }));
    applyXYDefaults(chart);

    const yRenderer = am5xy.AxisRendererY.new(root, {
      inversed: true, minGridDistance: 1, cellStartLocation: 0.1, cellEndLocation: 0.9
    });
    yRenderer.labels.template.setAll({ fill: textColor(), fontSize: 10, paddingRight: 8 });
    yRenderer.grid.template.setAll({ visible: false });

    const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "item", renderer: yRenderer }));

    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      min: 3, max: 5, extraMax: 0.12, renderer: am5xy.AxisRendererX.new(root, {})
    }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 10 });

    const rawData = typeof D.menuItemsByRating === 'function' ? D.menuItemsByRating() : D.menuItemsByRating;
    const data = Array.isArray(rawData) ? rawData : [];

    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis, yAxis, valueXField: "rating", categoryYField: "item",
      tooltip: am5.Tooltip.new(root, { labelText: "{categoryY}: {valueX} ★" })
    }));
    series.columns.template.setAll({ height: am5.percent(65), fill: am5.color("#F59E0B"), stroke: am5.color("#F59E0B"), cornerRadiusTR: 4, cornerRadiusBR: 4 });

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: "{valueX} ★", fill: textColor(), centerY: am5.percent(50), fontSize: 9, fontWeight: "600", populateText: true, dx: 8
        })
      });
    });

    yAxis.data.setAll(data);
    series.data.setAll(data);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  return {
        name: b.name,
        x: c.x,
        y: c.y,
        color: c.color,
        rev: Math.round(b.payout),
        orders: b.orders,
        rating: b.rating ? b.rating.toFixed(2) : "4.50",
        downtime: Math.round(b.downtimeMins / 60) + "h"
      };
    });

    const isDarkMode = isDark();
    const mapBg = isDarkMode ? "#09101D" : "#EFF4FE";
    const waterFill = isDarkMode ? "#101D33" : "#CBE0FE";
    const roadStroke = isDarkMode ? "rgba(255,255,255,0.09)" : "rgba(26,115,232,0.15)";
    const labelColor = isDarkMode ? "#E8F0FE" : "#0F1A2E";
    const textSubColor = isDarkMode ? "#8BA3C7" : "#4B5E7A";

    const svgContent = `
      <svg id="realTorontoMapSvg" width="100%" height="100%" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet" style="background:${mapBg}; border-radius:12px; font-family:Inter,sans-serif; overflow:hidden; cursor:grab;">
        <defs>
          <filter id="glowMapFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${waterFill}" stop-opacity="0.88"/>
            <stop offset="100%" stop-color="${waterFill}" stop-opacity="0.45"/>
          </linearGradient>
        </defs>

        <!-- TRANSFORMABLE VIEWPORT GROUP FOR PAN & ZOOM -->
        <g id="mapViewportGroup" transform="translate(0, 0) scale(1)">
          <!-- LAKE ONTARIO SHORELINE & WATER BASE -->
          <path d="M 0 400 Q 250 370, 500 420 T 1000 390 L 1000 500 L 0 500 Z" fill="url(#waterGrad)" />
          <text x="850" y="465" font-size="14" font-weight="800" fill="${textSubColor}" letter-spacing="1.5" opacity="0.6">LAKE ONTARIO</text>

          <!-- CANADA & REGIONAL CONTEXT BADGE -->
          <g transform="translate(20, 30)">
            <rect width="180" height="34" rx="8" fill="${isDarkMode ? 'rgba(17,24,39,0.85)' : 'rgba(255,255,255,0.92)'}" stroke="var(--border)" stroke-width="1.5"/>
            <text x="12" y="21" font-size="11" font-weight="700" fill="${labelColor}">🇨🇦 TORONTO, ON, CANADA</text>
          </g>

          <!-- MAJOR HIGHWAYS (Hwy 401, 427, Gardiner Expwy, DVP) -->
          <path d="M 50 120 Q 500 100, 950 140" stroke="${roadStroke}" stroke-width="5" stroke-dasharray="8 6" fill="none" />
          <text x="80" y="110" font-size="11" font-weight="700" fill="${textSubColor}">HWY 401 (Express & Collectors)</text>

          <path d="M 120 50 L 140 450" stroke="${roadStroke}" stroke-width="4" fill="none" />
          <text x="75" y="240" font-size="10" font-weight="700" fill="${textSubColor}">HWY 427</text>

          <path d="M 140 390 Q 400 360, 750 370 Q 820 300, 850 60" stroke="${roadStroke}" stroke-width="4" fill="none" />
          <text x="815" y="180" font-size="10" font-weight="700" fill="${textSubColor}">DON VALLEY PKWY (DVP)</text>

          <!-- DISTRICT / NEIGHBORHOOD LABELS -->
          <text x="170" y="160" font-size="13" font-weight="800" fill="${textSubColor}" opacity="0.4" letter-spacing="2">ETOBICOKE</text>
          <text x="500" y="160" font-size="13" font-weight="800" fill="${textSubColor}" opacity="0.4" letter-spacing="2">NORTH YORK</text>
          <text x="570" y="380" font-size="13" font-weight="800" fill="${textSubColor}" opacity="0.4" letter-spacing="2">DOWNTOWN TORONTO</text>
          <text x="790" y="200" font-size="13" font-weight="800" fill="${textSubColor}" opacity="0.4" letter-spacing="2">EAST YORK / DANFORTH</text>

          <!-- BRANCH LOCATION PINS & REVENUE HEAT CIRCLES -->
          ${branchCoords.map((b, i) => {
            const auraRadius = Math.max(22, Math.sqrt(b.rev) * 0.75);
            const coreRadius = Math.max(9, Math.sqrt(b.rev) * 0.28);
            
            return `
              <g class="map-node-group" id="mapNode_${b.name.replace(/[^a-zA-Z]/g, '')}" data-idx="${i}" style="cursor:pointer;">
                <!-- Outer Glowing Pulsing Aura -->
                <circle cx="${b.x}" cy="${b.y}" r="${auraRadius}" fill="${b.color}" opacity="0.25" filter="url(#glowMapFilter)">
                  <animate attributeName="r" values="${auraRadius};${auraRadius * 1.35};${auraRadius}" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.25;0.08;0.25" dur="3s" repeatCount="indefinite" />
                </circle>
                
                <!-- Core Solid Pin -->
                <circle cx="${b.x}" cy="${b.y}" r="${coreRadius}" fill="${b.color}" stroke="#FFFFFF" stroke-width="3" filter="url(#glowMapFilter)" />

                <!-- Branch Label Badge -->
                <g transform="translate(${b.x}, ${b.y - coreRadius - 12})">
                  <rect x="-65" y="-14" width="130" height="22" rx="6" fill="${isDarkMode ? '#111827' : '#FFFFFF'}" stroke="${b.color}" stroke-width="1.5" filter="drop-shadow(0 2px 6px rgba(0,0,0,0.15))"/>
                  <text x="0" y="1" font-size="10" font-weight="700" fill="${labelColor}" text-anchor="middle" dominant-baseline="middle">${b.name} ($${b.rev.toLocaleString()})</text>
                </g>
              </g>
            `;
          }).join('')}
        </g>
      </svg>

      <!-- Floating Glassmorphism Tooltip Container -->
      <div id="mapFloatingTooltip" style="position:absolute; display:none; pointer-events:none; z-index:100; background:rgba(17, 24, 39, 0.94); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.18); color:#E8F0FE; padding:12px 16px; border-radius:12px; box-shadow:0 10px 25px rgba(0,0,0,0.4); font-size:0.82rem; line-height:1.5;"></div>
    `;

    container.innerHTML = svgContent;

    const svg = document.getElementById("realTorontoMapSvg");
    const viewportGroup = document.getElementById("mapViewportGroup");
    const tooltip = document.getElementById("mapFloatingTooltip");

    // Apply Zoom & Pan State Function
    function updateMapTransform() {
      viewportGroup.setAttribute("transform", `translate(${mapZoomState.tx}, ${mapZoomState.ty}) scale(${mapZoomState.scale})`);
    }

    // Zoom Controls Functionality
    function zoomMap(delta, centerX = 500, centerY = 250) {
      const oldScale = mapZoomState.scale;
      let newScale = oldScale + delta;
      newScale = Math.max(0.7, Math.min(3.5, newScale));

      mapZoomState.tx = centerX - (centerX - mapZoomState.tx) * (newScale / oldScale);
      mapZoomState.ty = centerY - (centerY - mapZoomState.ty) * (newScale / oldScale);
      mapZoomState.scale = newScale;
      updateMapTransform();
    }

    // Bind Zoom Buttons
    const zoomInBtn = document.getElementById("mapZoomInBtn");
    const zoomOutBtn = document.getElementById("mapZoomOutBtn");
    const resetBtn = document.getElementById("mapResetBtn");
    const searchSelect = document.getElementById("mapSearchSelect");

    if (zoomInBtn) zoomInBtn.onclick = () => zoomMap(0.4);
    if (zoomOutBtn) zoomOutBtn.onclick = () => zoomMap(-0.4);
    if (resetBtn) resetBtn.onclick = () => {
      mapZoomState = { scale: 1, tx: 0, ty: 0 };
      updateMapTransform();
      if (searchSelect) searchSelect.value = "all";
    };

    // Location Search Jump Handler
    if (searchSelect) {
      searchSelect.onchange = (e) => {
        const val = e.target.value;
        if (val === "all") {
          mapZoomState = { scale: 1, tx: 0, ty: 0 };
          updateMapTransform();
          return;
        }

        const b = branchCoords.find(item => item.name === val);
        if (b) {
          // Zoom in directly to branch coordinates
          mapZoomState.scale = 2.2;
          mapZoomState.tx = 500 - (b.x * 2.2);
          mapZoomState.ty = 250 - (b.y * 2.2);
          updateMapTransform();
        }
      };
    }

    // Drag-to-Pan Handlers
    let isDragging = false;
    let startX = 0, startY = 0;

    svg.addEventListener("mousedown", (e) => {
      if (e.target.closest(".map-node-group")) return;
      isDragging = true;
      startX = e.clientX - mapZoomState.tx;
      startY = e.clientY - mapZoomState.ty;
      svg.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      mapZoomState.tx = e.clientX - startX;
      mapZoomState.ty = e.clientY - startY;
      updateMapTransform();
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
      svg.style.cursor = "grab";
    });

    // Mouse Wheel Zooming
    svg.addEventListener("wheel", (e) => {
      e.preventDefault();
      const rect = svg.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      zoomMap(delta, mouseX, mouseY);
    }, { passive: false });

    // Node Hover & Click Handlers
    const nodeGroups = container.querySelectorAll(".map-node-group");
    nodeGroups.forEach(group => {
      group.addEventListener("mouseenter", () => {
        const idx = group.getAttribute("data-idx");
        const b = branchCoords[idx];
        if (!b) return;

        tooltip.innerHTML = `
          <div style="font-weight:800; font-size:0.96rem; color:#FFFFFF; margin-bottom:6px; display:flex; align-items:center; gap:8px;">
            <span style="width:10px; height:10px; border-radius:50%; background:${b.color}; display:inline-block;"></span>
            ${b.name} Branch &bull; Toronto, CA
          </div>
          <div style="display:flex; flex-direction:column; gap:4px; font-size:0.8rem; color:#CBD5E1;">
            <div><strong>Net Revenue Payout:</strong> <span style="color:#38BDF8; font-weight:700;">CAD $${b.rev.toLocaleString()}</span></div>
            <div><strong>Total Orders:</strong> ${b.orders} orders</div>
            <div><strong>Customer Rating:</strong> ${b.rating} ★</div>
            <div><strong>Offline Downtime:</strong> ${b.downtime}</div>
          </div>
        `;
        tooltip.style.display = "block";
      });

      group.addEventListener("mousemove", (e) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        tooltip.style.left = (mouseX + 15 > rect.width - 220 ? mouseX - 220 : mouseX + 15) + "px";
        tooltip.style.top = (mouseY + 15 > rect.height - 130 ? mouseY - 130 : mouseY + 15) + "px";
      });

      group.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });

      group.addEventListener("click", () => {
        const idx = group.getAttribute("data-idx");
        const b = branchCoords[idx];
        const branchSelect = document.getElementById("filterBranch");
        if (branchSelect && b) {
          branchSelect.value = b.name;
          const applyBtn = document.getElementById("applyFiltersBtn");
          if (applyBtn) applyBtn.click();
        }
      });
    });
  }

  function drawBranchRadar() {
    const root = createRoot("branchRadarChart");
    if (!root) return;

    const chart = root.container.children.push(am5radar.RadarChart.new(root, {
      panX: false, panY: false, innerRadius: am5.percent(15), layout: root.verticalLayout
    }));
    const axisRenderer = am5radar.AxisRendererCircular.new(root, {});
    axisRenderer.labels.template.setAll({ radius: 10, fill: textColor(), fontSize: 11 });

    const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "category", renderer: axisRenderer }));
    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, { min: 0, max: 100, renderer: am5radar.AxisRendererRadial.new(root, {}) }));

    const categories = ["Orders", "Revenue", "Rating", "Accuracy", "Availability", "Speed"];
    xAxis.data.setAll(categories.map(c => ({ category: c })));

    const list = D.getFilteredBranchList().slice(0, 4);
    const colors = [am5.color("#1A73E8"), am5.color("#10B981"), am5.color("#F59E0B"), am5.color("#8B5CF6")];

    const radarSeriesList = [];

    list.forEach((branch, idx) => {
      const bData = D.rawBranchData[branch];
      const seriesData = [
        { category: "Orders",       value: Math.round(bData.orders / 200 * 100) },
        { category: "Revenue",      value: Math.round(bData.netPayout / 4500 * 100) },
        { category: "Rating",       value: Math.round((bData.rating - 4) * 100) },
        { category: "Accuracy",     value: Math.max(0, 100 - bData.inaccurate * 12) },
        { category: "Availability", value: Math.max(0, 100 - Math.round(bData.downtimeMins / 50)) },
        { category: "Speed",        value: Math.max(0, 100 - Math.round(bData.delivery - 20)) }
      ];

      const series = chart.series.push(am5radar.RadarLineSeries.new(root, {
        name: branch, xAxis, yAxis, valueYField: "value", categoryXField: "category",
        fill: colors[idx], stroke: colors[idx], tooltip: am5.Tooltip.new(root, { labelText: "{name}\n{categoryX}: {valueY}" })
      }));
      series.strokes.template.setAll({ strokeWidth: 2 });
      series.fills.template.setAll({ visible: true, fillOpacity: 0.12 });
      series.data.setAll(seriesData);
      radarSeriesList.push(series);
    });

    createTopLegend(root, chart, radarSeriesList);
    chart.appear(1000, 100);
  }

  function drawBranchCompare() {
    const root = createRoot("branchCompareChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      layout: root.verticalLayout,
      paddingLeft: 5, paddingRight: 40, paddingTop: 25, paddingBottom: 5
    }));
    applyXYDefaults(chart);

    const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "branch", renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }) }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 10, rotation: -15 });

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      extraMax: 0.22, renderer: am5xy.AxisRendererY.new(root, {})
    }));
    yAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 11 });

    const data = D.getFilteredBranchList().map(b => ({
      branch: b, orders: D.rawBranchData[b].orders, revenueScaled: Math.round(D.rawBranchData[b].netPayout / 20)
    }));

    function makeSeries(field, name, color) {
      const s = chart.series.push(am5xy.ColumnSeries.new(root, {
        name, xAxis, yAxis, valueYField: field, categoryXField: "branch", clustered: true,
        tooltip: am5.Tooltip.new(root, { labelText: "{categoryX} - " + name + ": {valueY}" })
      }));
      s.columns.template.setAll({ fill: am5.color(color), stroke: am5.color(color), cornerRadiusTL: 3, cornerRadiusTR: 3 });

      s.bullets.push(function() {
        return am5.Bullet.new(root, {
          locationY: 1,
          sprite: am5.Label.new(root, {
            text: "{valueY}", fill: textColor(), centerX: am5.percent(50), fontSize: 9, fontWeight: "700", populateText: true, dy: -16
          })
        });
      });

      s.data.setAll(data);
      return s;
    }

    const s1 = makeSeries("orders", "Orders Volume", "#1A73E8");
    const s2 = makeSeries("revenueScaled", "Revenue (CAD ÷20)", "#10B981");
    xAxis.data.setAll(data);

    createTopLegend(root, chart, [s1, s2]);
    chart.appear(1000, 100);
  }

  function drawCourierWait() {
    const root = createRoot("courierWaitChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      paddingLeft: 5, paddingRight: 60, paddingTop: 5, paddingBottom: 5
    }));
    applyXYDefaults(chart);

    const yRenderer = am5xy.AxisRendererY.new(root, {
      inversed: true, minGridDistance: 1,
      cellStartLocation: 0.1, cellEndLocation: 0.9
    });
    yRenderer.labels.template.setAll({ fill: textColor(), fontSize: 11, paddingRight: 8 });
    yRenderer.grid.template.setAll({ visible: false });

    const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "branch", renderer: yRenderer }));

    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      extraMax: 0.18, renderer: am5xy.AxisRendererX.new(root, {})
    }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 10 });
    xAxis.get("renderer").grid.template.setAll({ stroke: gridColor(), strokeWidth: 1, strokeDasharray: [4, 3] });

    const data = D.getFilteredBranchList().map(b => ({
      branch: b, wait: D.rawBranchData[b].courierWait
    })).sort((a, b) => b.wait - a.wait);

    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis, yAxis, valueXField: "wait", categoryYField: "branch",
      tooltip: am5.Tooltip.new(root, { labelText: "{categoryY}: {valueX} min courier wait" })
    }));
    series.columns.template.setAll({ height: am5.percent(65), fill: am5.color("#F97316"), stroke: am5.color("#F97316"), cornerRadiusTR: 4, cornerRadiusBR: 4 });

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: "{valueX}m", fill: textColor(), centerY: am5.percent(50), fontSize: 10, fontWeight: "600", populateText: true, dx: 8
        })
      });
    });

    yAxis.data.setAll(data);
    series.data.setAll(data);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }


  // ================================================================
  // DEDICATED MENU ANALYTICS CHARTS
  // ================================================================
  function drawTop10MenuChart() {
    const root = createRoot("top10MenuChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      paddingLeft: 5, paddingRight: 65, paddingTop: 5, paddingBottom: 5
    }));
    applyXYDefaults(chart);

    const yRenderer = am5xy.AxisRendererY.new(root, {
      inversed: true, minGridDistance: 1, cellStartLocation: 0.1, cellEndLocation: 0.9
    });
    yRenderer.labels.template.setAll({ fill: textColor(), fontSize: 10, paddingRight: 8 });
    yRenderer.grid.template.setAll({ visible: false });

    const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "item", renderer: yRenderer }));

    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      extraMax: 0.15, renderer: am5xy.AxisRendererX.new(root, {})
    }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 10 });
    xAxis.get("renderer").grid.template.setAll({ stroke: gridColor(), strokeWidth: 1, strokeDasharray: [4, 3] });

    const rawData = typeof D.top10MenuItems === 'function' ? D.top10MenuItems() : D.top10MenuItems;
    const data = Array.isArray(rawData) ? rawData : (D.topMenuItems || []);

    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis, yAxis, valueXField: "orders", categoryYField: "item",
      tooltip: am5.Tooltip.new(root, { labelText: "{categoryY}: {valueX.formatNumber('#,###')} orders (CAD ${sales})" })
    }));
    series.columns.template.setAll({ height: am5.percent(65), fill: am5.color("#1A73E8"), stroke: am5.color("#1A73E8"), cornerRadiusTR: 4, cornerRadiusBR: 4 });

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: "{valueX.formatNumber('#,###')}", fill: textColor(), centerY: am5.percent(50), fontSize: 10, fontWeight: "600", populateText: true, dx: 8
        })
      });
    });

    yAxis.data.setAll(data);
    series.data.setAll(data);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  function drawMenuRatingOnlyChart() {
    const root = createRoot("menuRatingOnlyChart");
    if (!root) return;

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false,
      paddingLeft: 5, paddingRight: 55, paddingTop: 5, paddingBottom: 5
    }));
    applyXYDefaults(chart);

    const yRenderer = am5xy.AxisRendererY.new(root, {
      inversed: true, minGridDistance: 1, cellStartLocation: 0.1, cellEndLocation: 0.9
    });
    yRenderer.labels.template.setAll({ fill: textColor(), fontSize: 10, paddingRight: 8 });
    yRenderer.grid.template.setAll({ visible: false });

    const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "item", renderer: yRenderer }));

    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      min: 3, max: 5, extraMax: 0.12, renderer: am5xy.AxisRendererX.new(root, {})
    }));
    xAxis.get("renderer").labels.template.setAll({ fill: mutedColor(), fontSize: 10 });

    const rawData = typeof D.menuItemsByRating === 'function' ? D.menuItemsByRating() : D.menuItemsByRating;
    const data = Array.isArray(rawData) ? rawData : [];

    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis, yAxis, valueXField: "rating", categoryYField: "item",
      tooltip: am5.Tooltip.new(root, { labelText: "{categoryY}: {valueX} ★" })
    }));
    series.columns.template.setAll({ height: am5.percent(65), fill: am5.color("#F59E0B"), stroke: am5.color("#F59E0B"), cornerRadiusTR: 4, cornerRadiusBR: 4 });

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: "{valueX} ★", fill: textColor(), centerY: am5.percent(50), fontSize: 9, fontWeight: "600", populateText: true, dx: 8
        })
      });
    });

    yAxis.data.setAll(data);
    series.data.setAll(data);
    series.appear(1000, 100);
    chart.appear(1000, 100);
  }

  return {
    initOverview() { drawOrdersTimeline(); drawRevenueBranch('revenueBranchChart'); drawRatingDist(); drawChannelPie(); drawDeliveryTime(); },
    initOrders() { drawHourlyOrders(); drawOrderStatus(); drawTicketSize(); drawPrepDelivery(); drawSubscription(); },
    initRevenue() { drawDailyRevenue(); drawRevenueBranch('revenueBranchChartRev'); },
    initDowntime() { drawDowntimeBranch(); drawDowntimeCauses(); drawAvailability(); drawPauseChart(); },
    initMenu() { drawTop10MenuChart(); drawMenuRatingOnlyChart(); },
    initRatings() { drawRatingBranch(); drawRatingTime(); drawMenuRating(); drawRatingTags(); drawFulfillmentRating(); },
    initAccuracy() { drawIssueType(); drawIssueBranch(); drawTopItems(); },
    initBranches() { drawBranchMap(); drawBranchCompare(); drawCourierWait(); },
    disposeAll() {
      Object.keys(roots).forEach(id => {
        try { roots[id].dispose(); } catch (e) {}
        delete roots[id];
      });
    }
  };
})();
