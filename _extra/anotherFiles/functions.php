<?
//"Толығырақ";
?>

<?php // Получение разметки слайдера?>
<?php
	function getSlider(){
		$args = array(
			'post_type' => 'slider', //Тип поста
			'posts_per_page' => 5,//Постов на одной странице
			'category_name' => 'slider' //Категория постов
		);
		$lastBlog = new WP_Query($args); //Запрос ко всем постам подходящим под массив #args
		if( $lastBlog->have_posts() ):

			while($lastBlog->have_posts() ): $lastBlog->the_post(); ?>
				<?php	$position = types_render_field( "position__slider", array('raw' => true) ); ?>
				<li>
					<?php
						$img = types_render_field( "image__slider", array('raw' => true) )?>
					<img src="<?php echo $img?>">
					<div class="filter_violet"></div>
					<div class="text">
						<div class="container <?php echo $position?>">

							<?php
									if (types_render_field( "beforeheader__slider", array('raw' => true) ) ):
										$date = types_render_field( "beforeheader__slider", array('raw' => true) )?>
										<div class="date"><?php echo $date?></div>
							<?php endif;?>

							<?php
									if (types_render_field( "header__slider", array('raw' => true) ) ):
										$header = types_render_field( "header__slider", array('raw' => true) )?>
										<h3><?php echo $header?></h3>
							<?php endif;?>

							<?php
									if (types_render_field( "afterheader__slider", array('raw' => true) ) ):
										$afterheader = types_render_field( "afterheader__slider", array('raw' => true) )?>
										<h4><?php echo $afterheader?></h4>
							<?php endif;?>

							<?php
									if (types_render_field( "ref__slider", array('raw' => true) ) ):
										$ref = types_render_field( "ref__slider", array('raw' => true) )?>
										<div class="wrap">
											<a class="button" href="<?php echo $ref?>">Подробнее</a>
										</div>
							<?php endif;?>
						</div>
					</div>
				</li>
			<?php
			endwhile;
		endif;
		wp_reset_postdata();
	}


	// Получение записей афиш для страницы афиши
	function getAfishOnPage() {
		$args = array(
			'post_type' => 'afish_ast', //Тип поста
			'posts_per_page' => 5,//Постов на одной странице
			'category_name' => 'afish' //Категория постов
		);
		$lastBlog = new WP_Query($args); //Запрос ко всем постам подходящим под массив #args
		if( $lastBlog->have_posts() ):
			while($lastBlog->have_posts() ): $lastBlog->the_post(); ?>
			<?php $name = types_render_field( "name_afish", array('raw' => true) ); ?>
			<?php $date_afish = types_render_field( "date_afish", array('raw' => true) ); ?>
			<?php $photo = types_render_field( "photo_afish", array('raw' => true) ); ?>
			<?php $ref = types_render_field( "repertory_afish", array('raw' => true) ); ?>
			<a href="<?php echo $ref ?>" data-parallax="scroll" data-image-src="<?php echo $photo; ?>" data-speed="0.3" class="parallax-window" target="_blank">
				<div class="filter_violet"></div>
	      <div class="container">
	        <div class="date__content"><?php echo $date_afish; ?></div>
	        <h3 class="header__content"><?php echo $name; ?></h3>
	      </div>
    </a>
    <?php
			endwhile;
		endif;
		wp_reset_postdata();
	}

	// Получение записей афиш для главной страницы
	function getAfishOnMain() {
		$iter = 0;
		$args = array(
			'post_type' => 'afish_ast', //Тип поста
			'posts_per_page' => 3,//Постов на одной странице
			'category_name' => 'afish' //Категория постов
		);
		$lastBlog = new WP_Query($args); //Запрос ко всем постам подходящим под массив #args
		if( $lastBlog->have_posts() ):
			while($lastBlog->have_posts() ): $lastBlog->the_post(); ?>
			<?php $name = types_render_field( "name_afish", array('raw' => true) ); ?>
			<?php $date_afish2 = types_render_field( "date_afish", array('raw' => true) ); ?>
			<?php $content = types_render_field( "content_afish", array('raw' => true) ); ?>
			<?php $photo = types_render_field( "photo_afish", array('raw' => true) ); ?>
			<?php $ref = types_render_field( "repertory_afish", array('raw' => true) ); ?>
			<?php $iter += 1;?>
				<div class="event">
	        <a href="<?php echo $ref?>">
		        <div class="thumbnail_event <?php echo $iter % 2 == 0 ? 'even' : 'odd';?>">
			        <img src="<?php echo $photo?>">
			        <div class="filter_violet"></div>
			      </div>
			    </a>
	        <div class="textbox_event">
	          <div class="wrap__textbox_event">
	            <h3><?php echo $name?></h3>
	            <h4><span class="bold">Дата: </span><span><?php echo $date_afish2?></span></h4>
	            <p><?php echo $content ?></p>
	            <a href="<?php echo $ref?>" class="link___wrap__textbox_event">Подробнее</a>
	          </div>
	        </div>
	      </div>
    <?php
			endwhile;
		endif;
		wp_reset_postdata();

	}

	function getRepertory() {
		$args = array(
			'post_type' => 'repertory_ast', //Тип поста
			'posts_per_page' => 20,//Постов на одной странице
			'category_name' => 'repertory' //Категория постов
		);
		$lastBlog = new WP_Query($args); //Запрос ко всем постам подходящим под массив #args
		if( $lastBlog->have_posts() ):
			while($lastBlog->have_posts() ): $lastBlog->the_post(); ?>
			<?php $name_reper = types_render_field( "header_repertory", array('raw' => true) ); ?>
			<?php $img_reper = types_render_field( "thumbnailvideo_repertory", array('raw' => true) ); ?>
				<div class="repertory">
					<a href="<?php echo get_permalink(); ?>" class="repertory__wrap">
						<img src="<?php echo $img_reper?>">
	          <div class="filter"></div>
	        </a>
	        <a href="<?php echo get_permalink(); ?>"><h3 class="repertory__header-name"><?php echo $name_reper?></h3></a>
	      </div>
    <?php
			endwhile;
		endif;
		wp_reset_postdata();

	}

	function getTruppa() {
		$args = array(
			'post_type' => 'truppa_ast', //Тип поста
			'posts_per_page' => -1,//Постов на одной странице
			'category_name' => 'units_truppa' //Категория постов
		);
		$lastBlog = new WP_Query($args); //Запрос ко всем постам подходящим под массив #args
		if( $lastBlog->have_posts() ):
			while($lastBlog->have_posts() ): $lastBlog->the_post(); ?>
			<?php $name_truppa = types_render_field( "name__truppa", array('raw' => true) ); ?>
			<?php $status_truppa = types_render_field( "status_truppa", array('raw' => true) ); ?>
			<?php $photo_truppa = types_render_field( "phototruppa_truppa", array('raw' => true) ); ?>
        <div class="people">
	        <a href="<?php echo get_permalink(); ?>" class="people__wrap">
		        <img src="<?php echo $photo_truppa?>">
            <div class="filter"></div>
          </a>
          <a href="<?php echo get_permalink(); ?>">
            <h3 class="people__header-name"><?php echo $name_truppa?></h3>
          </a>
          <h4 class="people__header-status"><?php echo $status_truppa?></h4>
        </div>
    <?php
			endwhile;
		endif;
		wp_reset_postdata();

	}

	function getLastEvents() {
		$args = array(
			'post_type' => 'news_ast', //Тип поста
			'posts_per_page' => 9,//Постов на одной странице
			'category_name' => 'news' //Категория постов
		);
		$lastBlog = new WP_Query($args); //Запрос ко всем постам подходящим под массив #args
		if( $lastBlog->have_posts() ):
			while($lastBlog->have_posts() ): $lastBlog->the_post(); ?>
			<li>
				<div class="slide_elem">
					<a href="<?php echo get_permalink(); ?>" class="column__slide_elem">
							<?php if (types_render_field( "thumbnail_news_or_blog", array('output' => 'raw') ) == 1 ): ?>
								<div class="thumbnail___column__slide_elem">
									<img src="<?php echo types_render_field( "thumbnail_for_thumb_news_or_blog", array('output' => 'raw') ); ?>"></img>
									<div class="filter____thumbnail___column__slide_elem"></div>
								</div>

								<div class="text___column__slide_elem">
									<h3 class="header___text__column"><?php echo types_render_field( "header_news_or_blog", array() ); ?></h3>
									<h4 class="date___text__column"><?php the_date('d M y'); ?></h4>
								</div>

							<?php elseif ( types_render_field( "thumbnail_news_or_blog", array('output' => 'raw') ) == 0 ) : ?>
								<div class="thumbnail___column__slide_elem">
									<div class="blockquote____thumbnail___column__slide_elem"></div>
									<div class="filter____thumbnail___column__slide_elem"></div>
								</div>

								<div class="blockquote_icon___column__slide_elem"></div>
								<p class="text____thumbnail___column__slide_elem"><?php echo types_render_field( "short_content_news_or_blog", array('output' => 'raw') ); ?></p>
							<?php  elseif ( types_render_field( "thumbnail_news_or_blog", array('output' => 'raw') ) == 2 ): ?>
								<div class="thumbnail___column__slide_elem">
									<img src="<?php echo types_render_field( "thumbnail_for_video_news_or_blog", array('output' => 'raw') ); ?>"></img>
									<div class="filter____thumbnail___column__slide_elem"></div>
								</div>

								<div class="text___column__slide_elem">
									<h3 class="header___text__column"><?php echo types_render_field( "header_news_or_blog", array() ); ?></h3>
									<h4 class="date___text__column"><?php the_date('d M y'); ?></h4>
								</div>
							<?php endif;?>
					</a>
				</div>
			</li>
    <?php
			endwhile;
		endif;
		wp_reset_postdata();

	}
