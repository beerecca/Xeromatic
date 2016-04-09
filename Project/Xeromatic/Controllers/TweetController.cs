using System.Collections.Generic;
using Xeromatic.Models;
using Xeromatic.Services;
using System.Web.Http;
using System.Linq;

namespace Xeromatic.Controllers
{
    public class TweetController : ApiController
    {
        private readonly TweetDbService _tweetDbService;
        private readonly TwitterApiService _twitterApiService;

        public TweetController()
        {
            _tweetDbService = new TweetDbService();
            _twitterApiService = new TwitterApiService();
        }

        // GET: /PinnedTweets
        // Returns the tweets from the database.
        [HttpGet]
        [Route("PinnedTweets")]
        public IEnumerable<Tweet> PinnedTweets()
        {
            var tweets = _tweetDbService.GetTweets();
            return tweets;
        }

        // GET: /RecentTweets
        // Returns tweets from the twitter api
        [HttpGet]
        [Route("RecentTweets")]
        public IEnumerable<Tweet> RecentTweets()
        {
            var tweets = _twitterApiService.GetTweets();
            return tweets;
        } 
    }
}
