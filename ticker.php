<?php
// ticker.php - outputs only the ticker HTML, no HTML document tags
include 'conn.php';
?>
<style>
.news-ticker {
  background: linear-gradient(90deg, #C0392B 0%, #2C3E50 100%);
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.news-ticker .ticker-label {
  background: #C0392B;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  padding: 0 16px;
  height: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  border-right: 2px solid rgba(255,255,255,0.2);
  flex-shrink: 0;
}
.news-ticker .ticker-content {
  color: rgba(255,255,255,0.90);
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  animation: tickerScroll 30s linear infinite;
  padding-left: 100%;
}
@keyframes tickerScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-100%); }
}
</style>

<div class="news-ticker">
  <div class="ticker-label">
    <i class="fa-solid fa-rss" style="margin-right:6px;"></i> Latest Updates
  </div>
  <div style="overflow:hidden; flex:1;">
    <div class="ticker-content">
      First blood donation camp to be organised by RaktSeva in collaboration with Blood Bank &amp; Donation Management System &mdash; Come and be a part of this noble cause!
    </div>
  </div>
</div>
